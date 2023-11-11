import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),],
    server: {
        proxy: {
          '/api': {
              target: `http://127.0.0.1:8415`,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
              timeout: 60 * 1000
          },
          '/auth': {
              target: `http://127.0.0.1:8415`,
              changeOrigin: true,
              timeout: 60 * 1000
          }
        }
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, './src')
        }
    }
})
