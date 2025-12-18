import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_DEV_SERVER_PORT) || 5173,
      proxy: {
        '/**': {
          target: env.VITE_API_PROXY_TARGET || 'http://localhost:1818',
          changeOrigin: true,
          secure: false,
        }
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
})
