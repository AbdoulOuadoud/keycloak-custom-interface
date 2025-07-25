import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { keycloakify } from 'keycloakify/vite-plugin';
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    tailwindcss(),
    keycloakify({
      accountThemeImplementation: "none",
      themeName: "fdn-themes",
      environmentVariables: [
        { name: 'FDN_THEME_PRIMARY_COLOR', default: '#1976d2' },
        { name: 'FDN_THEME_SECONDARY_COLOR', default: '#9c27b0' }
      ]
    })
  ]
})
