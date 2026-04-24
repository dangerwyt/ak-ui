import { type App } from 'vue';
import AkaElement from 'aka-element';
import DefaultTheme from 'vitepress/theme';
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';
import 'aka-element/dist/index.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', {
      ...ElementPlusContainer,
      inheritAttrs: false,
    });
    app.use(AkaElement);
  },
};
