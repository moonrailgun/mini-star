import { applyConfig, getPluginList } from './config';
import { requirePlugin } from './helper';

export function loadPluginByUrl(url: string): Promise<Event> {
  return new Promise((resolve, reject) => {
    const scriptDom = document.createElement('script');
    scriptDom.src = url;
    scriptDom.onload = (e) => {
      resolve(e);
    };
    scriptDom.onerror = (e) => {
      reject(e);
    };

    document.body.appendChild(scriptDom);
  });
}

/**
 * Load All Plugin from List
 * @param plugins
 * @returns
 */
function loadPluginList(plugins: ministar.Plugin[]) {
  const allpromise = plugins.map((plugin) => {
    // Append Plugins
    getPluginList()[plugin.name] = {
      ...plugin,
      name: `@plugins/${plugin.name}`,
      entry: 'index.js',
    };

    const pluginName = plugin.name;
    const pluginUrl = plugin.url;
    return new Promise((resolve) => {
      console.debug(`[${pluginName}] Start Loading...`);
      requirePlugin([`${pluginUrl}`], (b) => {
        console.debug(`[${pluginName}] Load Completed!`);
        resolve(b);
      });
    });
  });
  return Promise.all(allpromise);
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
