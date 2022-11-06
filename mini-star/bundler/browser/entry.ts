// import { rollup } from '@rollup/browser';
import { rollup } from 'rollup';
import { buildRollupOptions, PluginContext } from '../rollup.config';

export async function buildPluginBrowser(pluginContext: PluginContext) {
  const options = buildRollupOptions(pluginContext) as any;
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
