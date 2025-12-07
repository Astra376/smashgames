import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  // 1. Translated 'publicPath' to Vite's 'base' property
  base: process.env.NODE_ENV === "production" ? "/vue-deploy/" : "/",

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