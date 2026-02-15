import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Vite Configuration
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  // Note: process.cwd() is available in Node.js context (during build)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    server: {
      // Development server port from environment or default
      port: parseInt(env.VITE_DEV_SERVER_PORT) || 5173,

      // Proxy configuration to avoid CORS in development
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
        // Path alias for cleaner imports: import from '@/components/...'
        '@': path.resolve(__dirname, './src'),
      },
    },

    // Build optimizations
    build: {
      // Output directory
      outDir: 'dist',

      // Generate source maps for production (optional, can be disabled)
      sourcemap: false,

      // Chunk size warnings
      chunkSizeWarningLimit: 1000,

      // Rollup options for code splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunk for large dependencies
            'vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui': ['antd', '@ant-design/icons'],
            'charts': ['recharts'],
            'animations': ['framer-motion', 'gsap'],
          },
        },
      },
    },

    // Dependency optimization
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
  };
});
