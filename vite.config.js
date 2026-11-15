// José Raúl Guerrero Parra
// Proxy para la API DataSphere.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/backend': {
        target: 'https://localhost:7288', //URL del backend de DataSphere.
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/backend/, ''), // Reescribir la ruta para que coincida con la ruta de la API en el backend.
      },
    },
  },
})
