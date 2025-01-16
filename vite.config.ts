// vite.config.js
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';

// Load environment variables
dotenv.config();

// Remove console.log as it's not needed in production
console.log('PORT from .env:', process.env.PORT);

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env': JSON.stringify(process.env),
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5172,
    proxy: {
      '/api': {
        target: 'http://tribeodyssey.net',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (_proxyReq, req, _res) => {
            console.log('Sending Request:', req.method, (req.url || ''));
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response:', proxyRes.statusCode, (req.url || ''));
          });
        }
      },
      '/raffles': {
        target: 'http://tribeodyssey.net',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
        }
      }
    },
    cors: {
      origin: ['http://tribeodyssey.net', 'http://localhost:5172'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5172,
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@config': path.resolve(__dirname, 'src/lib/config'),
      '@hooks': path.resolve(__dirname, 'src/lib/hooks'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@maintenance': path.resolve(__dirname, 'src/pages/Maintenance'),
    },
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  publicDir: 'public',
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@web3modal/ethereum', '@web3modal/react']
  }
});