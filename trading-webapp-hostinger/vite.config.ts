import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  
  // Server Configuration
  server: {
    port: 5173,
    host: true, // Écouter sur toutes les interfaces (0.0.0.0)
    strictPort: false, // Si le port est occupé, essayer le suivant
    open: false, // Ne pas ouvrir automatiquement le navigateur
    cors: true, // Activer CORS
    // HTTPS Configuration (optionnel pour développement)
    // https: {
    //   key: './localhost-key.pem',
    //   cert: './localhost.pem',
    // },
    // Proxy pour API (si nécessaire)
    proxy: {
      // Exemple de proxy pour API externe
      // '/api': {
      //   target: 'https://api.example.com',
      //   changeOrigin: true,
      //   secure: true,
      // },
    },
    // Headers de sécurité
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  },
  
  // Preview Server (pour tester le build)
  preview: {
    port: 4173,
    host: true,
    strictPort: false,
    cors: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  },
  
  // Build Configuration
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    target: "esnext",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          supabase: ['@supabase/supabase-js']
        },
        // Optimisation des noms de fichiers
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    },
    // Avertissements de taille
    chunkSizeWarningLimit: 1000,
  },
  
  // Environment Variables
  define: {
    'import.meta.env.PROD': JSON.stringify(process.env.NODE_ENV === 'production'),
    'import.meta.env.DEV': JSON.stringify(process.env.NODE_ENV === 'development')
  },
  
  // Optimisations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'],
    exclude: [],
  },
  
  // CSS Configuration
  css: {
    devSourcemap: true,
  },
});
