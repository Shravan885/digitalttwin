import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/scenario': { target: 'http://127.0.0.1:8000', changeOrigin: true },
      '/baseline': { target: 'http://127.0.0.1:8000', changeOrigin: true },
      '/heavy-rain': { target: 'http://127.0.0.1:8000', changeOrigin: true },
      '/green-boost': { target: 'http://127.0.0.1:8000', changeOrigin: true },
      '/compare': { target: 'http://127.0.0.1:8000', changeOrigin: true },
      '/ndvi': { target: 'http://127.0.0.1:8000', changeOrigin: true },
      '/flood-risk': { target: 'http://127.0.0.1:8000', changeOrigin: true },
      '/climate': { target: 'http://127.0.0.1:8000', changeOrigin: true },
    },
  },
})
