import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/user': {
        target: 'https://app.lijun520.cn',
        changeOrigin: true,
        
      },
      '/admin': {
        target: 'https://app.lijun520.cn',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://app.lijun520.cn',
        changeOrigin: true,
      },
      '/shopCart': {
        target: 'https://app.lijun520.cn',
        changeOrigin: true,
      },
     
    }
  }
})
