# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```


- 环境变量 

https://blog.csdn.net/hzxOnlineOk/article/details/126182179

- 路由守卫 `component/Auth`

https://blog.csdn.net/weixin_49866029/article/details/122981826

- gzip压缩 

https://blog.csdn.net/dly15873944157/article/details/122842350

- 路由懒加载(按需加载) `.umirc.ts`

``` 
dynamicImport: {
    loading: '@/components/Loading',
  },
```

bug:
- axios处理拦截器存在config.headers报错
[解决办法](https://blog.csdn.net/wuyxinu/article/details/124175591)