import { defineConfig, loadEnv } from 'vite'
// import path from 'path'
import { ViteAliases } from "vite-aliases";
import { viteAliasPlugin, viteMockPlugin } from './plugins'
import { viteMockServe } from 'vite-plugin-mock'
import viteCompression from 'vite-plugin-compression';
import cdn from 'vite-plugin-cdn-import'

const postcssPresetEnv = require('postcss-preset-env');

// command: 'serve' | 'build'  mode: 'development' | 'production'
export default defineConfig(({ command, mode }) => {
  // console.log(command, mode);
  // console.log('process', process);
  // const env = loadEnv(mode, process.cwd(), '')
  // console.log('env-----', env);
  return {
    // envPrefix: 'APP_'
    // optimizeDeps: {},
    // resolve: {
    //   alias: {
    //     "@": path.resolve(__dirname, "./assets")
    //   }
    // },
    // base: '/my/public/path/',
    css: {
      preprocessorOptions: {
        less: {
          math: 'always',
          globalVars: {
            mainColor: 'red'
          },
          additionalData: '@import "./variable.less";'
        }
      },
      devSourcemap: true,
      postcss: {
        plugins: [postcssPresetEnv()]
      }
    },
    build: {
      rollupOptions: {
        // watch: {
        //   include: ['src/**']
        // }
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    },
    plugins: [
      // ViteAliases(),
      viteAliasPlugin({
        keyName: '#'
      }),
      // viteMockServe()
      viteMockPlugin(),
      viteCompression(),
      cdn({
        modules: [
          {
            name: 'lodash',
            var: '_',
            path: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js'
          }
        ]
      })
    ]
  }
})