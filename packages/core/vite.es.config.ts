import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import { filter, map } from 'lodash-es';
import dts from 'vite-plugin-dts';

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }) as any,
  ],
  build: {
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'AKAUI',
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
          if (assetInfo.name === 'style.css') {
            return 'index.css';
          }
          return assetInfo.name as string;
        },
        manualChunks(id) {
          // console.log(id);
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('utils')) {
            return 'utils';
          }
          if (id.includes('hooks')) {
            return 'hooks';
          }
          for (const name of getDirectoriesSync('../components')) {
            if (id.includes(`/packages/components/${name}`)) {
              return name;
            }
          }
        },
      },
    },
  },
});
