import { rollup } from 'rollup';
import { buildRollupOptions } from './rollup.config';

export async function bundlePlugin(pluginPackageJsonPath: string) {
  const options = buildRollupOptions(pluginPackageJsonPath);
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
