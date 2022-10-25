import { defineConfig } from 'umi';

export default defineConfig({
  metas: [
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
  ],
  exportStatic: {},
  // 按需加载：将umi.js和umi.css拆分
  dynamicImport: {
    loading: '@/components/Loading',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  locale: {
    default: 'zh-CN', // 工程默认语言
    antd: true,
    // 默认为true。为true时，会使用`navigator.language`覆盖默认。为false时，则使用默认语言
    baseNavigator: false,
  },
  // proxy: {
  //   '/api': {
  // target: 'http://localhost:8000',
  // target: 'http://www.summeryoga.top',
  //   pathRewrite: { '^/api': '' },
  //   changeOrigin: true,
  // },
  // },
});
