import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/conpr/',
  plugins: [react()],
  resolve: {
    alias: {
      '@conpr/react': path.resolve(__dirname, 'packages/react/src/index.tsx'),
      '@conpr/core': path.resolve(__dirname, 'packages/core/src/index.ts'),
      '@opensource-showcase/core': path.resolve(__dirname, 'packages/core/src/index.ts'),
      '@opensource-showcase/react': path.resolve(__dirname, 'packages/react/src/index.tsx'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
