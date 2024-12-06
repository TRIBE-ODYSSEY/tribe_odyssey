
import { defineConfig } from 'vite';

import * as path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      "@pages": path.resolve(__dirname, 'src/pages'),
      "@components": path.resolve(__dirname, 'src/components'),
      "@lib": path.resolve(__dirname, 'src/lib'),
      "@config": path.resolve(__dirname, 'src/lib/config'),
      
      
    },
  },
});
