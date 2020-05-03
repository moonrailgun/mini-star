import path from 'path';
import typescript from '@rollup/plugin-typescript';

const name = process.env.npm_package_name;
const main = process.env.npm_package_main;

/**
 * reset amd id to uniq with `pluginName/fileName`
 */
function replaceId() {
  return {
    name: 'replace',
    generateBundle(options, bundle) {
      Object.values(bundle).forEach((x) => {
        x.code = x.code.replace(/define\(['|"]([^'"]+)['|"],/, function (
          p1,
          p2
        ) {
          console.log(p1);
          return `define('${p2}/${x.fileName}',`;
        });
      });
    },
  };
}

export default {
  input: main,
  output: {
    dir: path.resolve(__dirname, '../dist/plugin', name),
    format: 'amd',
    amd: {
      id: name,
    },
    sourcemap: true,
  },
  plugins: [typescript(), replaceId()],
};
