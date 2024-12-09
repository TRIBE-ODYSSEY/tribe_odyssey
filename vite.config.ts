// vite.config.js
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@config': path.resolve(__dirname, 'src/lib/config'),
    },
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif'], 
  optimizeDeps: {
    exclude: ["@tanstack/react-query", "wagmi"],
  },
  build: {
    target:'es2022',
    commonjsOptions: {
      include: [/node_modules/],
    },  
    rollupOptions: {
      external: ['@tanstack/react-query', 'wagmi'],
    },
    chunkSizeWarningLimit: 1000,
    
  },
  esbuild: {
    logOverride: { 'use client': 'silent' },
    target: "es2022"
  }
});