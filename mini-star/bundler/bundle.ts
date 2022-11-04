import { rollup, RollupWatcher, watch } from 'rollup';
import { buildRollupOptions, PluginContext } from './rollup.config';
import fs from 'fs';

export async function buildPlugin(pluginPackageJsonPath: string) {
  const options = buildRollupOptions(readPackageJSON(pluginPackageJsonPath));
  // Create a bundle
  const bundle = await rollup(options);

  // Write the bundle to disk
  if (Array.isArray(options.output)) {
    for (const output of options.output) {
      await bundle.write(output);
    }
  } else {
    await bundle.write(options.output);
  }
}

export function watchPlugin(pluginPackageJsonPath: string): RollupWatcher {
  const options = buildRollupOptions(readPackageJSON(pluginPackageJsonPath));

  const watcher = watch(options);

  return watcher;
}

/**
 * Read package json
 */
function readPackageJSON(pluginPackageJsonPath: string): PluginContext {
  let packageConfig: any = {};
  try {
    packageConfig =
      JSON.parse(fs.readFileSync(pluginPackageJsonPath, 'utf8')) || {};
  } catch (err) {
    throw new Error(`Read [${pluginPackageJsonPath}] fail: ${String(err)}`);
  }

  if (!('name' in packageConfig) || !('main' in packageConfig)) {
    throw new Error(`[${pluginPackageJsonPath}] require field: name, main`);
  }

  return {
    pluginPackageJsonPath,
    packageConfig,
  };
}
