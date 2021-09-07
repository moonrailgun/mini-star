---
sidebar_position: 3
---

# .ministarrc.json
`MiniStar` has its own configuration file, create the configuration file of `MiniStar` in the root directory (the directory where you run `MiniStar`)

The spouse file name allows the following examples:
- `.ministarrc`
- `.ministarrc.json`
- `.ministarrc.yaml`
- `.ministarrc.yml`
- `.ministarrc.js`
- `ministar.config.js`: Export a `CommonJS` object, just like `webpack`

## Configuration

### scope

Default: `"plugins"`

The scope named when the plugin `ministar createPlugin` was created, like `@[scope]/[name]`

### pluginRoot

Default: `process.cwd()`

The path of the folder where the plug-in directory is located. The structure of creating and reading plug-ins is `[pluginRoot]/plugins/[name]`

### outDir

Default: `path.resolve(process.cwd(), './dist')`

The output directory of the ministar bundler

### externalDeps

Default: `[]`

External dependencies, the values appearing in this array will not be packaged by the packaging tool.

### author

Default: `undefined`

Used to create plugins

### license

Default: `undefined`

Used to create plugins

### rollupPlugins

Default: `[]`

An array of `rollup` plugins for adding custom `rollup` plugins

### buildRollupPlugins

Default: `undefined`

A Function of `rollup` plugin, like `rollupPlugins` but have full control.

Should return a list for rollup plugins.

For example:
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
