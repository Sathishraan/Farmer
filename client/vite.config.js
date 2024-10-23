import react from '@vitejs/plugin-react';
import path from 'path';

import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      fastRefresh: false, // Optional for debugging fast refresh issues
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  cacheDir: './node_modules/.vite', // Optional: Adjust cache directory
});
