import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// 本地 http://localhost:3000
// 在线 https://api.lijun520.cn

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/user': {
        target: 'https://api.lijun520.cn',
        changeOrigin: true,
        
      },
      '/admin': {
        target: 'https://api.lijun520.cn',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://api.lijun520.cn',
        changeOrigin: true,
      },
      '/shopCart': {
        target: 'https://api.lijun520.cn',
        changeOrigin: true,
      },
     
    }
  }

})
