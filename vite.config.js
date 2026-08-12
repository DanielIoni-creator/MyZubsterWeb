import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const htmlEntries = Object.fromEntries(
  readdirSync(import.meta.dirname)
    .filter((name) => name.endsWith('.html'))
    .map((name) => [name.replace(/\.html$/, ''), resolve(import.meta.dirname, name)]),
);

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
<<<<<<< HEAD
      input: htmlEntries,
=======
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        taz: resolve(import.meta.dirname, 'taz.html'),
        admin: resolve(import.meta.dirname, 'admin.html'),
      },
>>>>>>> origin/main
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
