import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import ptconfig from '../.ptconfig.json';
import fs from 'fs';

const scope = ptconfig.scope;
const name = process.env.npm_package_name.replace(`@${scope}/`, '');
const main = process.env.npm_package_main;

const config = JSON.parse(fs.readFileSync('./package.json', 'utf8')) || {};
const rootConfig =
  JSON.parse(fs.readFileSync('../../package.json', 'utf8')) || {};
const apps = fs.readdirSync('../');
const deps = Object.keys(rootConfig.devDependencies || {})
  .concat(Object.keys(rootConfig.dependencies || {}))
  .concat(Object.keys(rootConfig.peerDependencies || {}))
  .concat(Object.keys(config.devDependencies || {}))
  .concat(Object.keys(config.dependencies || {}))
  .concat(Object.keys(config.peerDependencies || {}))
  .concat(apps.map((x) => `@plugins/${x}`));

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
          return `definePlugin('${p2}/${x.fileName}',`;
        });
      });
    },
  };
}

console.log('main', main)

export default {
  input: main,
  output: {
    dir: path.resolve(__dirname, '../dist/plugins', name),
    format: 'amd',
    amd: {
      id: name,
    },
    sourcemap: true,
  },
  plugins: [
    typescript({ noResolve: true }),
    resolve({ browser: true }),
    commonjs(),
    replaceId(),
  ],
  external: (id) => {
    // console.log('id', id);

    for (const x of deps) {
      if (id.startsWith(x)) {
        return true;
      }
    }

    return false;
  },
};
