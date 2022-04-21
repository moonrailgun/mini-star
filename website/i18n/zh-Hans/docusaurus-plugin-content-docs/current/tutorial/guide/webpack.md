---
sidebar_position: 6
---

# Webpack

## 开发环境

在 `webpack` 配置中使用 `contentBase` 可以帮助 `webpack-dev-server` 代理插件目录，如:

```javascript
{
  // ...
  devServer: {
    contentBase: './dist',
  },
  // ...
}
```
