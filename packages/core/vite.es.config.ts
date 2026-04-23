import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import { delay, filter, map } from 'lodash-es';
import shell from 'shelljs';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import hooks from './hooksPlugin';
import terser from '@rollup/plugin-terser';

const TRY_MOVE_STYLES_DELAY = 800 as const;

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

function moveStyles() {
  try {
    readdirSync('./dist/es/theme');
    shell.mv('./dist/es/theme', './dist/');
  } catch (error) {
    delay(moveStyles, TRY_MOVE_STYLES_DELAY);
  }
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }) as any,
    hooks({
      rmFiles: ['./dist/es', './dist/theme', './dist/types'],
      afterBuild: moveStyles,
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ['log'],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          '@DEV': JSON.stringify(isDev),
          '@PROD': JSON.stringify(isProd),
          '@TEST': JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        comments: !isProd,
        beautify: !isProd,
        braces: !isProd,
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
  ],
  build: {
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'AKAElement',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fontawesome/vue-fontawesome',
        '@fortawesome/free-solid-svg-icons',
        '@popperjs/core',
        'async-validator',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          const fileName =
            assetInfo.names && assetInfo.names[0]
              ? (assetInfo.names[0] as string)
              : 'asset';

          if (fileName === 'style.css') {
            return 'index.css';
          }
          if (assetInfo.type === 'asset' && /\.(css)$/i.test(fileName)) {
            return 'theme/[name].[ext]';
          }
          return fileName;
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (
            id.includes('/packages/utils') ||
            id.includes('plugin-vue:export-helper')
          ) {
            return 'utils';
          }
          if (id.includes('/packages/hooks')) {
            return 'hooks';
          }
          for (const item of getDirectoriesSync(
            resolve(__dirname, '../components')
          )) {
            if (id.includes(`/packages/components/${item}`)) {
              return item;
            }
          }
        },
      },
    },
  },
});
