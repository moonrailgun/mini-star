---
sidebar_position: 3
---

# .ministarrc.json

`MiniStar` 具有自己的配置文件，在根目录(运行`MiniStar`的目录)下创建`MiniStar`的配置文件

配偶文件名称允许如下示例:
- `.ministarrc`
- `.ministarrc.json`
- `.ministarrc.yaml`
- `.ministarrc.yml`
- `.ministarrc.js`
- `ministar.config.js`: 导出一个`CommonJS`对象, 就像`webpack`一样

## 配置项

### scope

默认值: `"plugins"`

创建插件`ministar createPlugin`时命名的scope, 形如`@[scope]/[name]`

### pluginRoot

默认值: `process.cwd()`

插件目录所在文件夹路径。创建与读取插件的结构为`[pluginRoot]/plugins/[name]`

### outDir

默认值: `path.resolve(process.cwd(), './dist')`

插件打包的输出目录

### externalDeps

默认值: `[]`

外部依赖, 在这个数组中出现的值将不会被打包工具打包进去。

### author

默认值: `undefined`

用于创建插件

### license

默认值: `undefined`

用于创建插件

### rollupPlugins

默认值: `[]`

一个`rollup`插件数组，用于添加自定义的`rollup`插件

### buildRollupPlugins

默认值: `undefined`

一个用于构建`rollup`插件列表的函数，类似于`rollupPlugins`但是对于插件列表拥有完整控制权

应当返回一个插件列表数组

示例代码:
```js
const vuePlugin = require('rollup-plugin-vue');

module.exports = {
  buildRollupPlugins: (plugins) => [
    vuePlugin({
      css: true,
      compileTemplate: true,
    }),
    ...plugins,
  ],
};
```
