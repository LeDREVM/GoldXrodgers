export interface NextcloudConfig {
  url: string;
  username: string;
  password: string;
  basePath: string;
}

export const getNextcloudConfig = (): NextcloudConfig => {
  // Correction de l'URL (enlever le double https://)
  let url = import.meta.env.VITE_NEXTCLOUD_URL || 'https://ledream.kflw.io';
  if (url.startsWith('https://https://')) {
    url = url.replace('https://https://');
  }
  
  const username = import.meta.env.VITE_NEXTCLOUD_USERNAME || 'negus_dja';
  const password = import.meta.env.VITE_NEXTCLOUD_PASSWORD || '';
  const basePath = import.meta.env.VITE_NEXTCLOUD_BASE_PATH || '/Trading';

  return { url, username, password, basePath };
};
