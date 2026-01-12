import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@conpr/react': path.resolve(__dirname, 'packages/react/src'),
      '@conpr/core': path.resolve(__dirname, 'packages/core/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
