import { defineConfig } from 'umi';
const CompressionPlugin = require('compression-webpack-plugin');

export default defineConfig({
  metas: [
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
  ],
  define: {
    'process.env': {
      NODE_ENV: 'dev',
      UMI_ENV: 'dev',
    },
  },
  routes: [
    { path: '/', component: '@/pages/Index' },
    { path: '/dea', component: '@/pages/dea', wrappers: ['@/components/Auth'] },
    { path: '/login', component: '@/pages/login' },
    { path: '/register', component: '@/pages/register' },
  ],
  dynamicImport: {
    loading: '@/components/Loading',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: false,
  },
  chunks: ['vendors', 'umi'],
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            react: {
              name: 'react',
              priority: 20,
              test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router)[\\/]/,
            },
            vendor: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 6,
            },
            antd: {
              name: 'antd',
              test: /[\\/]node_modules[\\/]antd[\\/]/,
              chunks: 'all',
              priority: 10,
            },
            xlsx: {
              name: 'xlsx',
              test: /[\\/]node_modules[\\/]xlsx[\\/]/,
              chunks: 'async',
              priority: 10,
            },
            reactcolor: {
              name: 'xlsx',
              test: /[\\/]node_modules[\\/]react-color[\\/]/,
              chunks: 'async',
              priority: 19,
            },
            wangeditor: {
              name: 'wangeditor',
              priority: 21,
              test: /[\\/]node_modules[\\/](wangeditor|@wangeditor|@wangeditor\/editor|@wangeditor\/editor-for-react)[\\/]/,
            },
            uiwmap: {
              name: 'uiwmap',
              priority: 20,
              test: /[\\/]node_modules[\\/](uiw|@uiw|@uiw\/react-baidu-map|@uiw\/react-baidu-map-require-script)[\\/]/,
            },
            charts: {
              name: 'charts',
              priority: 20,
              test: /[\\/]node_modules[\\/](@ant-design\/charts)[\\/]/,
            },
            async: {
              chunks: 'async',
              minChunks: 2,
              name: 'async',
              maxInitialRequests: 1,
              minSize: 0,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      },
    });
    if (process.env.NODE_ENV === 'prod') {
      config.plugin('compression-webpack-plugin').use(CompressionPlugin, [
        {
          test: /\.js$|\.html$|\.css$/, //匹配文件名
          threshold: 10240, //对超过10k的数据压缩
          deleteOriginalAssets: false, //不删除源文件
        },
      ]);
    }
    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locale$/, /zh-cn/];
      });
  },
});
