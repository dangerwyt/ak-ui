import { defineConfig } from 'vitepress';
import {
  containerPreview,
  componentPreview,
} from '@vitepress-demo-preview/plugin';

export default defineConfig({
  title: 'Aka-Element',
  description: 'UI组件库',
  base: '/ak-ui/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Basic 基础组件',
        items: [{ text: 'Button 按钮', link: '/api-examples' }],
      },
      {
        text: 'Feedback 反馈组件',
        items: [{ text: 'Alert 提示', link: '/components/alert' }],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview, {
        // 禁用额外属性的传递，避免 Vue 警告
        inheritAttrs: false,
      });
    },
  },
});
