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

### extraDeps

Default: `[]`

For additional dependencies, `MiniStar` will automatically consider the dependencies marked in the `packag.json` file in the current directory and the dependencies beginning with `@capital/` as public dependencies, and will not be packaged during plug-in packaging. If you need additional dependencies, please add here

### author

Default: `undefined`

Used to create plugins

### license

Default: `undefined`

Used to create plugins

### rollupPlugins

Default: `[]`

An array of `rollup` plugins for adding custom `rollup` plugins
