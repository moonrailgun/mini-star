---
sidebar_position: 3
---

# 加载插件

基座项目可以是任何一个项目，就像一个正常的项目一样。

只需要在合适的地方去通过`mini-star`来初始化项目即可

比如:
```javascript
import { initMiniStar } from 'mini-star';

console.log('App start');

initMiniStar({
  plugins: [
    {
      name: 'test',
      url: '/plugins/test/index.js',
    },
  ],
}).then(() => {
  console.log('Plugin Load Success');
});
```

`plugins`中的列表可以来源于任何地方，本教程为了方便直接给出固定的一个数组，在实际生产环境中可以来自一个`App Store`或者用户的手动选择。

打包插件和基座项目后，此时输出的结构树应该是这样的:

```
.
├── bundle.js
├── bundle.js.map
├── index.html
└── plugins
    └── test
        ├── index.js
        └── index.js.map
```

启动一个静态文件服务(比如`http-server`)看一下。

控制台输出:
![](/img/docs/usePlugin.jpg)

- 第一行来自基座项目第一个`console.log`
- 第二行的 `Hello World` 来自`test` 插件的内容
- 第三行来自基座项目插件加载完毕的回调

可以看见，我们非常简单的就为一个已有项目增加了插件的功能。`mini-star`就是如此简单！
