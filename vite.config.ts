import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/conpr/',
  plugins: [react()],
  resolve: {
    alias: {
      '@openpr/react': path.resolve(__dirname, 'packages/react/src/index.tsx'),
      '@openpr/core': path.resolve(__dirname, 'packages/core/src/index.ts'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
