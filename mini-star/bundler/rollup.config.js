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
const deps = [
  ...Object.keys(rootConfig.dependencies || {}),
  ...Object.keys(rootConfig.devDependencies || {}),
  ...Object.keys(rootConfig.peerDependencies || {}),
  // ...Object.keys(config.dependencies || {}),
  // ...Object.keys(config.devDependencies || {}),
  // ...Object.keys(config.peerDependencies || {}),
  ...apps.map((x) => `@plugins/${x}`),
];

function getFileNameWithoutExt(filepath) {
  return path.basename(filepath).split('.')[0];
}

/**
 * reset AMD id to uniq with `pluginName/fileName`
 */
function replaceId() {
  return {
    name: 'replace',
    generateBundle(options, bundle) {
      Object.values(bundle).forEach((x) => {
        x.code = x.code.replace(
          /define\(['|"]([^'"]+)['|"],/,
          function (match, p1) {
            const modulePrefix = `@plugins/${p1}`;
            let moduleId = modulePrefix + '/' + x.fileName;
            if (
              getFileNameWithoutExt(main) === getFileNameWithoutExt(x.fileName)
            ) {
              moduleId = modulePrefix;
            }

            return `definePlugin('${moduleId}',`;
          }
        );
      });
    },
  };
}

console.log('main', main);

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
