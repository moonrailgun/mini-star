import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import { config } from './config';
import { RollupOptions, Plugin as RollupPlugin } from 'rollup';
import { getPluginDirs } from './utils';
import styles from 'rollup-plugin-styles';
import url from '@rollup/plugin-url';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import { CustomPluginContext } from './types';

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

  const prefixDepsMatch = [
    ...getPluginDirs().map((x) => `@plugins/${x}`),
    '@capital/', // builtin dependencies prefix
  ];
  const exactDepsMatch = [...config.externalDeps];

  const customPluginContext: CustomPluginContext = {
    pluginName: name,
  };

  let customRollupPlugins: RollupPlugin[] = [];
  if (Array.isArray(config.rollupPlugins)) {
    customRollupPlugins = config.rollupPlugins;
  } else if (typeof config.rollupPlugins === 'function') {
    customRollupPlugins = config.rollupPlugins(customPluginContext);
  }

  let plugins: RollupPlugin[] = [
    esbuild({
      // https://www.npmjs.com/package/rollup-plugin-esbuild
      // All options are optional
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: true,
      minify: process.env.NODE_ENV === 'production',
      tsconfig: path.resolve(
        path.dirname(pluginPackageJsonPath),
        './tsconfig.json'
      ),
    }),
    styles(),
    url(),
    json(),
    ...customRollupPlugins,
    resolve({ browser: true }),
    commonjs(),
    replaceId(),
  ];
  if (typeof config.buildRollupPlugins === 'function') {
    plugins = config.buildRollupPlugins(plugins, customPluginContext);
  }

  function getFileNameWithoutExt(filepath: string) {
    return path.basename(filepath).split('.')[0];
  }

  /**
   * reset AMD id to uniq with `pluginName/fileName`
   */
  function replaceId(): RollupPlugin {
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
    plugins,
    external: (id: string) => {
      for (const dep of prefixDepsMatch) {
        if (id.startsWith(dep)) {
          return true;
        }
      }

      for (const dep of exactDepsMatch) {
        if (id === dep) {
          return true;
        }
      }

      return false;
    },
    preserveEntrySignatures: 'strict',
  };
}
