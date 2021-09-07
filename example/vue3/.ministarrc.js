const vuePlugin = require('rollup-plugin-vue');

module.exports = {
  outDir: './public',
  externalDeps: ['vue'],
  buildRollupPlugins: (plugins) => [
    vuePlugin({
      css: true,
      compileTemplate: true,
    }),
    ...plugins,
  ],
};
