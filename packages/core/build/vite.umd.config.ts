import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFile } from 'fs';
import { delay, defer } from 'lodash-es';
import { compression } from 'vite-plugin-compression2';
import shell from 'shelljs';
import { visualizer } from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue';
import hook from './hooksPlugin';
import terser from '@rollup/plugin-terser';

const TRY_MOVE_STYLES_DELAY = 800 as const;

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

function moveStyles() {
  readFile('./dist/umd/index.css.gz', (err) => {
    if (err) return;
    delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.cp('./dist/umd/index.css', './dist/index.css'));
  });
}

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    visualizer({
      filename: 'dist/stats.umd.html',
    }),
    hook({
      rmFiles: ['./dist/umd', './dist/index.css'],
      afterBuild: moveStyles,
    }),
    terser({
      compress: {
        drop_console: ['log'],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          '@Dev': JSON.stringify(isDev),
          '@Test': JSON.stringify(isTest),
          '@Prod': JSON.stringify(isProd),
        },
      },
    }),
  ],
  build: {
    outDir: 'dist/umd/',
    lib: {
      entry: resolve(__dirname, '../index.ts'),
      name: 'AKAElement',
      fileName: 'index',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          const fileName =
            assetInfo.names && assetInfo.names[0]
              ? (assetInfo.names[0] as string)
              : 'asset';
          if (fileName === 'style.css') {
            return 'index.css';
          }
          return fileName;
        },
      },
    },
  },
});
