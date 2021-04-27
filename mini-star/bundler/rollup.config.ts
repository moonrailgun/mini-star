import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import { config } from './config';
import { RollupOptions, Plugin } from 'rollup';
import { getPluginDirs } from './utils';

export function buildRollupOptions(
  pluginPackageJsonPath: string
): RollupOptions {
  const packageConfig =
    JSON.parse(fs.readFileSync(pluginPackageJsonPath, 'utf8')) || {};
  const scope = config.scope;
  const name = packageConfig.name.replace(`@${scope}/`, '');
  const main = packageConfig.main;

  const rootConfig =
    JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8')
    ) || {};

  const deps = [
    ...Object.keys(rootConfig.dependencies || {}),
    ...Object.keys(rootConfig.devDependencies || {}),
    ...Object.keys(rootConfig.peerDependencies || {}),
    // ...Object.keys(packageConfig.dependencies || {}),
    // ...Object.keys(packageConfig.devDependencies || {}),
    // ...Object.keys(packageConfig.peerDependencies || {}),
    ...getPluginDirs().map((x) => `@plugins/${x}`),
  ];

  function getFileNameWithoutExt(filepath: string) {
    return path.basename(filepath).split('.')[0];
  }

  /**
   * reset AMD id to uniq with `pluginName/fileName`
   */
  function replaceId(): Plugin {
    return {
      name: 'replace',
      generateBundle(options, bundle) {
        Object.values(bundle).forEach((item: any) => {
          item.code = item.code.replace(
            /define\(['|"]([^'"]+)['|"],/,
            function (match: string, p1: string) {
              const modulePrefix = `@plugins/${p1}`;
              let moduleId = modulePrefix + '/' + item.fileName;
              if (
                getFileNameWithoutExt(main) ===
                getFileNameWithoutExt(item.fileName)
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

  return {
    input: path.resolve(path.dirname(pluginPackageJsonPath), main),
    output: {
      dir: path.resolve(process.cwd(), './dist/plugins', name),
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
    external: (id: string) => {
      // console.log('id', id);

      for (const x of deps) {
        if (id.startsWith(x)) {
          return true;
        }
      }

      return false;
    },
  };
}
