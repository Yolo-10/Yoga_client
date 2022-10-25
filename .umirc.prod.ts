import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'prod',
      UMI_ENV: 'prod',
    },
  },
});
