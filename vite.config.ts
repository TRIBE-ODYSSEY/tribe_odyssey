// vite.config.js
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';

// Load environment variables
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env': JSON.stringify(process.env),
    'process.env': JSON.stringify(process.env),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'src/test/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/**'
      ]
    },
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5172,
    proxy: {
      '/api': {
        target: 'https://tribeodyssey.net',
        changeOrigin: true,
        secure: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            proxyReq.setHeader('Origin', 'https://tribeodyssey.net');
            console.log('Sending Request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response:', proxyRes.statusCode, req.url);
          });
        }
      },
    },
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
      '@test': path.resolve(__dirname, 'src/test'),
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
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@web3modal/ethereum', '@web3modal/react']
  }
});