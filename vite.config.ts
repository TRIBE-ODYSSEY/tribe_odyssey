// vite.config.js
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';
dotenv.config();
// Dodaj logowanie, aby sprawdzić wartość PORT
console.log('PORT from .env:', process.env.PORT);

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',

    port: process.env.PORT ? parseInt(process.env.PORT) : 5172,
    
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5172, // Użyj PORT z .env lub domyślnie 5173
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@config': path.resolve(__dirname, 'src/lib/config'),
      '@hooks': path.resolve(__dirname, 'src/lib/hooks'),
    },
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif'],
});