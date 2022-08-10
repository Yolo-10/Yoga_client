import { defineConfig } from 'umi';

export default defineConfig({
  metas: [
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  exportStatic: {},
  routes: [
    { path: '/', component: '@/pages/init' },
    { path: '/dea', component: '@/pages/dea' },
    { path: '/login', component: '@/pages/login' },
  ],
  fastRefresh: {},
  locale: {
    default: 'zh-CN', // 工程默认语言
    antd: true,
    // 默认为true。为true时，会使用`navigator.language`覆盖默认。为false时，则使用默认语言
    baseNavigator: false,
  },
  //  proxy: {
  //   '/api': {
  //     target: 'http://localhost:8000',
  //     pathRewrite: { '^/api': '' },
  //     changeOrigin: true,
  //   },
  // },
});
