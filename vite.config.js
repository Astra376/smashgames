import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

// Fix for "__dirname" in ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  // CLOUDFLARE FIX: Always use '/' as the base
  base: '/',

  plugins: [vue()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'ace-builds': path.resolve(__dirname, 'node_modules/ace-builds')
    }
  },

  optimizeDeps: {
    include: ['ace-builds']
  }
})