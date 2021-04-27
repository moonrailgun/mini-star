import { rollup } from 'rollup';
import { buildRollupOptions } from './rollup.config';

export async function bundlePlugin(pluginPackageJsonPath: string) {
  const options = buildRollupOptions(pluginPackageJsonPath);
  // create a bundle
  const bundle = await rollup(options);

  // or write the bundle to disk
  await bundle.write(options);
}
