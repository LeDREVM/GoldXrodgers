import axios, { AxiosInstance } from 'axios';
import { getNextcloudConfig } from '../config/nextcloud';

class NextcloudService {
  private client: AxiosInstance | null = null;
  private config = getNextcloudConfig();
  private baseUrl = '';

  /**
   * Initialise le client WebDAV pour Nextcloud
   */
  async initialize(): Promise<void> {
    if (!this.config.password) {
      throw new Error('Mot de passe Nextcloud manquant. Configurez VITE_NEXTCLOUD_PASSWORD');
    }

    this.baseUrl = `${this.config.url}/remote.php/dav/files/${this.config.username}`;
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      auth: {
        username: this.config.username,
        password: this.config.password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Test de connexion
    try {
      await this.client.request({
        method: 'PROPFIND',
        url: '/',
        headers: {
          Depth: '0',
        },
      });
    } catch (error: any) {
      if (error.response?.status !== 207) {
        throw new Error(`Erreur de connexion à Nextcloud: ${error.message}`);
      }
    }
  }

  /**
   * Vérifie si le client est initialisé
   */
  private ensureInitialized(): void {
    if (!this.client) {
      throw new Error('Client Nextcloud non initialisé. Appelez initialize() d\'abord.');
    }
  }

  /**
   * Lit un fichier JSON depuis Nextcloud
   */
  async readJSON<T>(path: string): Promise<T | null> {
    this.ensureInitialized();
    
    try {
      const fullPath = `${this.config.basePath}${path}`;
      const response = await this.client!.get(fullPath, {
        responseType: 'text',
      });
      
      return JSON.parse(response.data) as T;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw new Error(`Erreur lecture fichier ${path}: ${error.message}`);
    }
  }

  /**
   * Écrit un fichier JSON dans Nextcloud
   */
  async writeJSON<T>(path: string, data: T): Promise<void> {
    this.ensureInitialized();
    
    try {
      const fullPath = `${this.config.basePath}${path}`;
      const content = JSON.stringify(data, null, 2);
      
      // Créer le dossier parent si nécessaire
      const parentDir = fullPath.substring(0, fullPath.lastIndexOf('/'));
      if (parentDir) {
        try {
          await this.client!.request({
            method: 'PROPFIND',
            url: parentDir,
            headers: { Depth: '0' },
          });
        } catch {
          // Créer le dossier récursivement
          const parts = parentDir.split('/').filter(p => p);
          let currentPath = '';
          for (const part of parts) {
            currentPath += '/' + part;
            try {
              await this.client!.request({
                method: 'MKCOL',
                url: currentPath,
              });
            } catch (e: any) {
              if (e.response?.status !== 405) {
                throw e;
              }
            }
          }
        }
      }
      
      await this.client!.put(fullPath, content, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error: any) {
      throw new Error(`Erreur écriture fichier ${path}: ${error.message}`);
    }
  }

  /**
   * Liste les fichiers d'un dossier
   */
  async listDirectory(path: string): Promise<string[]> {
    this.ensureInitialized();
    
    try {
      const fullPath = `${this.config.basePath}${path}`;
      const response = await this.client!.request({
        method: 'PROPFIND',
        url: fullPath,
        headers: { Depth: '1' },
      });
      
      // Parser la réponse XML (simplifié)
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const responses = xmlDoc.getElementsByTagName('d:response');
      const files: string[] = [];
      
      for (let i = 0; i < responses.length; i++) {
        const href = responses[i].getElementsByTagName('d:href')[0]?.textContent || '';
        const propstat = responses[i].getElementsByTagName('d:propstat')[0];
        const resourcetype = propstat?.getElementsByTagName('d:resourcetype')[0];
        const isCollection = resourcetype?.getElementsByTagName('d:collection').length > 0;
        
        if (!isCollection && href) {
          const fileName = href.split('/').pop() || '';
          if (fileName) {
            files.push(fileName);
          }
        }
      }
      
      return files;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return [];
      }
      throw new Error(`Erreur liste dossier ${path}: ${error.message}`);
    }
  }

  /**
   * Supprime un fichier
   */
  async deleteFile(path: string): Promise<void> {
    this.ensureInitialized();
    
    try {
      const fullPath = `${this.config.basePath}${path}`;
      await this.client!.delete(fullPath);
    } catch (error: any) {
      throw new Error(`Erreur suppression fichier ${path}: ${error.message}`);
    }
  }

  /**
   * Vérifie si un fichier existe
   */
  async fileExists(path: string): Promise<boolean> {
    this.ensureInitialized();
    
    try {
      const fullPath = `${this.config.basePath}${path}`;
      await this.client!.request({
        method: 'PROPFIND',
        url: fullPath,
        headers: { Depth: '0' },
      });
      return true;
    } catch {
      return false;
    }
  }

  // ============================================
  // MÉTHODES SPÉCIFIQUES AU TRADING
  // ============================================

  /**
   * Charge la watchlist
   */
  async getWatchlist(): Promise<any[]> {
    const watchlist = await this.readJSON<any[]>('/watchlist.json');
    return watchlist || [];
  }

  /**
   * Sauvegarde la watchlist
   */
  async saveWatchlist(watchlist: any[]): Promise<void> {
    await this.writeJSON('/watchlist.json', watchlist);
  }

  /**
   * Charge les analyses
   */
  async getAnalyses(): Promise<any[]> {
    const files = await this.listDirectory('/analyses');
    const analyses = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const analysis = await this.readJSON<any>(`/analyses/${file}`);
        if (analysis) {
          analyses.push({ ...analysis, id: file.replace('.json', '') });
        }
      }
    }
    
    return analyses;
  }

  /**
   * Sauvegarde une analyse
   */
  async saveAnalysis(analysis: any): Promise<void> {
    const id = analysis.id || `analysis_${Date.now()}`;
    await this.writeJSON(`/analyses/${id}.json`, {
      ...analysis,
      id,
      updatedAt: new Date().toISOString(),
    });
  }

  /**
   * Charge les données économiques
   */
  async getEconomicData(): Promise<any> {
    return await this.readJSON<any>('/economic_data/events.json') || {};
  }

  /**
   * Sauvegarde les données économiques
   */
  async saveEconomicData(data: any): Promise<void> {
    await this.writeJSON('/economic_data/events.json', {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  }

  /**
   * Charge les corrélations
   */
  async getCorrelations(): Promise<any[]> {
    return await this.readJSON<any[]>('/correlations/correlations.json') || [];
  }

  /**
   * Sauvegarde les corrélations
   */
  async saveCorrelations(correlations: any[]): Promise<void> {
    await this.writeJSON('/correlations/correlations.json', correlations);
  }
}

// Instance singleton
export const nextcloudService = new NextcloudService();
