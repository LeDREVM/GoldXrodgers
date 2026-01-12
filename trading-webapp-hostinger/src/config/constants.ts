// Application constants

export const IS_PRODUCTION = import.meta.env.PROD
export const IS_DEVELOPMENT = import.meta.env.DEV
export const MODE = import.meta.env.MODE

// API Configuration
export const API_BASE_URL = IS_PRODUCTION
  ? import.meta.env.VITE_API_URL || ''
  : 'http://localhost:5173'

// App Configuration
export const APP_NAME = 'Trading WebApp'
export const APP_VERSION = '1.0.0'

// Feature Flags
export const ENABLE_ANALYTICS = IS_PRODUCTION
export const ENABLE_DEBUG_MODE = IS_DEVELOPMENT
export const ENABLE_DEV_TOOLS = IS_DEVELOPMENT

// Logging
export const LOG_LEVEL = IS_PRODUCTION ? 'error' : 'debug'


export const APP_TIMEZONE =
  import.meta.env.VITE_APP_TIMEZONE || "America/Martinique";

export const DEFAULT_WATCHLIST =
  (import.meta.env.VITE_DEFAULT_WATCHLIST as string | undefined)?.split(",") ||
  ["US30", "NAS100", "XAUUSD", "USDJPY", "XBRUSD"];

export const MAX_UPLOAD_MB = Number(import.meta.env.VITE_MAX_UPLOAD_MB || "10");

export const STORAGE_BUCKET = "trade-screens";
