import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/**': {
        target: 'http://localhost:1818',
        changeOrigin: true,
        secure: false,
      }
    },  
    // port:   
  }
})

