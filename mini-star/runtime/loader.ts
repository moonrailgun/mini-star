import { applyConfig, getPluginList } from './config';
import { requirePlugin } from './helper';

/**
 * Load All Plugin from List
 */
export function loadPluginList(
  plugins: ministar.Plugin[]
): Promise<ministar.Module[]> {
  const allpromise = plugins.map((plugin) => {
    // Append Plugins
    getPluginList()[plugin.name] = {
      ...plugin,
      name: `@plugins/${plugin.name}`,
    };

    const pluginName = plugin.name;
    const pluginUrl = plugin.url;
    return new Promise<ministar.Module>((resolve) => {
      console.debug(`[${pluginName}] Start Loading...`);
      requirePlugin([`${pluginUrl}`], (pluginModule) => {
        console.debug(`[${pluginName}] Load Completed!`);
        resolve(pluginModule);
      });
    });
  });

  return Promise.all(allpromise);
}

/**
 * Load Single Plugin
 */
export async function loadSinglePlugin(
  plugin: ministar.Plugin
): Promise<ministar.Module> {
  const [pluginModule] = await loadPluginList([plugin]);
  return pluginModule;
}

interface MiniStarOptions extends ministar.GlobalConfig {
  plugins?: ministar.Plugin[];
}
/**
 * Init Mini Star
 */
export async function initMiniStar(options: MiniStarOptions) {
  applyConfig(options);

  if (Array.isArray(options.plugins) && options.plugins.length > 0) {
    await loadPluginList(options.plugins);
  }
}
