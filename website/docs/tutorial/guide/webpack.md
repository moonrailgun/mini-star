---
sidebar_position: 6
---

# Webpack

## Development Environment

Using `contentBase` in the `webpack` configuration can help `webpack-dev-server` proxy the plugin directory, such as:

```javascript
{
  // ...
  devServer: {
    contentBase: './dist',
  },
  // ...
}
```
