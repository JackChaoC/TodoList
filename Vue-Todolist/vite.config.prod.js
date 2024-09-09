import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    base: '/todolist',//nginx静态资源访问路径，与AJAX请求路径不同！
    plugins: [vue()],
    build: {
        outDir: 'todolist', // 修改为你想要的目录名
    },
    resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'), // 配置 '@' 别名
        },
      },
});
