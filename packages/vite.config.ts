import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['components/**/*.ts', 'components/**/*.d.ts', 'components/**/*.vue', 'utils/**/*.ts', 'hooks/**/*.ts', 'types/**/*.ts', 'index.ts', 'resolver.ts'],
      outDir: 'dist/types',
      entryRoot: __dirname,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'VakaoUI',
      fileName: (format) => `vakao-ui.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
    outDir: 'dist',
    emptyOutDir: false,
    sourcemap: true,
    // 启用CSS代码分割
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname),
    },
  },
})