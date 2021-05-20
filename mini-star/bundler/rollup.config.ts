import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import { config } from './config';
import { RollupOptions, Plugin } from 'rollup';
import { getPluginDirs } from './utils';

// https://github.com/rollup/rollup/blob/master/docs/999-big-list-of-options.md

type RequiredPick<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export function buildRollupOptions(
  pluginPackageJsonPath: string
): RequiredPick<RollupOptions, 'input' | 'output' | 'plugins' | 'external'> {
  let packageConfig: any = {};
  try {
    packageConfig =
      JSON.parse(fs.readFileSync(pluginPackageJsonPath, 'utf8')) || {};
  } catch (err) {
    throw new Error(`Read [${pluginPackageJsonPath}] fail: ${String(err)}`);
  }
  const scope = config.scope;

  if (!('name' in packageConfig) || !('main' in packageConfig)) {
    throw new Error(`[${pluginPackageJsonPath}] require field: name, main`);
  }

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
        Object.values(bundle).forEach((item) => {
          if ('code' in item) {
            // Process OutputChunk
            item.code = item.code.replace(
              /definePlugin\(['|"]([^'"]+)['|"],/,
              function (match: string, p1: string) {
                let moduleId = p1;
                if (
                  getFileNameWithoutExt(main) ===
                  getFileNameWithoutExt(item.fileName)
                ) {
                  moduleId = `@plugins/${name}`;
                } else if (!p1.endsWith('.js')) {
                  // TODO: Need to optimize
                  moduleId += '.js';
                }

                return `definePlugin('${moduleId}',`;
              }
            );
          }
        });
      },
    };
  }

  return {
    input: path.resolve(path.dirname(pluginPackageJsonPath), main),
    output: {
      dir: path.resolve(config.outDir, './plugins', name),
      format: 'amd',
      amd: {
        autoId: true,
        basePath: `@plugins/${name}`,
        define: 'definePlugin',
      },
      sourcemap: true,
    },
    plugins: [
      typescript({
        noResolve: true,
        tsconfig: path.resolve(
          path.dirname(pluginPackageJsonPath),
          './tsconfig.json'
        ),
      }),
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
