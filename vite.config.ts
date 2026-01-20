import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
          },
        ],
        dts: 'src/types/auto-imports.d.ts',
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: 'src/types/components.d.ts',
      }),
      viteMockServe({
        mockPath: 'src/mocks',
        enable: command === 'serve',
        logger: true,
      }),
    ],
    resolve: {
      // 配置路径别名
      alias: {
        // __dirname 表示当前文件所在目录（项目根目录）
        // '@' 指向项目根目录下的 src 文件夹
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
