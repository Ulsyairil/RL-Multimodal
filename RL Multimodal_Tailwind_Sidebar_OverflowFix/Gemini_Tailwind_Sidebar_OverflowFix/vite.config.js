import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        after: resolve(import.meta.dirname, 'index.html'),
        before: resolve(import.meta.dirname, 'before.html'),
      },
    },
  },
})