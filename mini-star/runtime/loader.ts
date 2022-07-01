import { applyConfig, callPluginLoadError, getPluginList } from './config';
import { requirePlugin } from './helper';
import type { GlobalConfig, Module, Plugin } from './types';

/**
 * Load All Plugin from List
 */
export function loadPluginList(plugins: Plugin[]): Promise<Module[]> {
  const allPromise = plugins.map((plugin) => {
    // Append Plugins
    getPluginList()[plugin.name] = {
      ...plugin,
      name: `@plugins/${plugin.name}`,
    };

    const pluginName = plugin.name;
    const pluginUrl = plugin.url;

    return new Promise<Module>((resolve, reject) => {
      console.debug(`[${pluginName}] Start Loading...`);
      requirePlugin(
        [`${pluginUrl}`],
        (pluginModule: Module) => {
          console.debug(`[${pluginName}] Load Completed!`);
          resolve(pluginModule);
        },
        (err) => {
          reject(err);
        }
      );
    }).catch((error) => {
      callPluginLoadError({
        pluginName,
        detail: new Error(error),
      });
      return null;
    });
  });

  return Promise.all(allPromise).then(
    (modules) => modules.filter(Boolean) as Module[]
  );
}

/**
 * Load Single Plugin
 */
export async function loadSinglePlugin(plugin: Plugin): Promise<Module> {
  const [pluginModule] = await loadPluginList([plugin]);
  return pluginModule;
}

interface MiniStarOptions extends GlobalConfig {
  plugins?: Plugin[];
}
/**
 * Init Mini Star
 */
export async function initMiniStar(options: MiniStarOptions) {
  applyConfig(options); // Apply init runtime config

  if (Array.isArray(options.plugins) && options.plugins.length > 0) {
    await loadPluginList(options.plugins);
  }
}
