import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'app'),
  server: {
    port: 3333,
    strictPort: false,
  },
  build: {
    outDir: resolve(__dirname, 'dist-app'),
  },
});
