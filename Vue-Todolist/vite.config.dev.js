import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: {
      // 自定义 HMR 选项，例如：
      protocol: 'ws',
      port: 3001
    },
    proxy: {
      // 在此处编写代理规则
      '/api': {
        target: 'http://localhost:3000/todolist',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/\/api/, '')
        }
      }
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }

})
