---
sidebar_position: 4
---

# 缩减插件入口代码

在`MiniStar`使用的场合，为了保证代码的时序性可能需要先加载插件代码以后再去加载主项目代码。

在这时候插件代码本身的体积就非常重要。

我们应当尽可能保证插件代码入口文件的体积。

### 动态加载

尽可能使用动态加载以分割内部逻辑

```javascript
import('/path/to/other/logic').then(() => {
  // ...
})
```

### 异步组件

如果使用的是`React`这样的UI框架，可以使用动态加载的异步组件带代替原来的直接引入。
- [@loadable/component](https://www.npmjs.com/package/@loadable/component)
