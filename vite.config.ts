// vite.config.js
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// Load environment variables
dotenv.config();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      'process.env': env,
      'import.meta.env': JSON.stringify(process.env),
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '5172'),
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        }
      },
      allowedHosts: ['tribe-odyssey-web.onrender.com', 'www.tribeodyssey.net']
    },
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '5172'),
      allowedHosts: ['tribe-odyssey-web.onrender.com', 'www.tribeodyssey.net']
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
        '@types': path.resolve(__dirname, 'src/types'),
      },
    },
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif'],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: process.env.NODE_ENV !== 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            web3: ['ethers', 'viem', 'wagmi'],
          }
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
          drop_debugger: true
        }
      }
    },
    publicDir: 'public',
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['@web3modal/ethereum', '@web3modal/react']
    }
  };
});