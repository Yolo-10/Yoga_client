import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/', component: '@/layouts', routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/dea', component: '@/pages/dea' },
      ]
    }
  ],
  fastRefresh: {},
  locale: {
    default: 'zh-CN', // 工程默认语言
    antd: true,
    // 默认为true。为true时，会使用`navigator.language`覆盖默认。为false时，则使用默认语言
    baseNavigator: false,
  },
});
