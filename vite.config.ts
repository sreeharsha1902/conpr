import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/conpr/',
  resolve: {
    alias: {
      '@openpr/core': path.resolve(__dirname, 'packages/core/src/index.ts'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
