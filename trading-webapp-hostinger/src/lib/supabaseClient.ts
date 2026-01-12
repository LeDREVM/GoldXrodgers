import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  )
}

// Configuration du client Supabase avec options de protocole
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // Gérer les redirections selon le protocole
    flowType: 'pkce', // Utiliser PKCE pour une meilleure sécurité
  },
  // Configuration globale
  global: {
    headers: {
      'x-client-info': 'trading-webapp-hostinger@1.0.0',
    },
  },
  // Configuration du realtime (si utilisé plus tard)
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  // Configuration du storage
  storage: {
    // Timeout pour les uploads
    timeout: 60000, // 60 secondes
  },
})
