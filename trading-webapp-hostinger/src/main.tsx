import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/globals.css'
import { IS_PRODUCTION, LOG_LEVEL } from './config/constants'

// Error boundary for production
if (IS_PRODUCTION) {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)
    // You can add error reporting service here (e.g., Sentry)
  })

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    // You can add error reporting service here
  })
}

// Log environment info in development
if (!IS_PRODUCTION && LOG_LEVEL === 'debug') {
  console.log('🚀 App starting in development mode')
  console.log('Environment:', import.meta.env.MODE)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
