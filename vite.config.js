import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: 'web',
  publicDir: 'public',
  build: {
    outDir: '../www',
    emptyOutDir: true,
    sourcemap: false
  },
  resolve: { alias: { '@': resolve(process.cwd(), 'web/src') } }
});
