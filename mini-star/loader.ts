import { requirePlugin } from './helper';

export function loadPluginByUrl(url: string): Promise<Event> {
  return new Promise((resolve, reject) => {
    const scriptDom = document.createElement('script');
    scriptDom.src = getPluginUrlPrefix() + url;
    scriptDom.onload = (e) => {
      resolve(e);
    };
    scriptDom.onerror = (e) => {
      reject(e);
    };

    document.body.appendChild(scriptDom);
  });
}

interface Plugin {
  name: string;
  entry?: string;
  url: string;
}

const _plugins: Record<string, Plugin> = {};
let _pluginUrlPrefix: string = '/plugins/';

/**
 * get all pluginList
 */
export function getPluginList(): Record<string, Plugin> {
  return _plugins;
}

/**
 * get all pluginUrlPrefix
 */
export function getPluginUrlPrefix(): string {
  return _pluginUrlPrefix;
}

/**
 * Load All Plugin from List
 * @param plugins
 * @returns
 */
export function loadPluginList(plugins: Plugin[]) {
  const allpromise = plugins.map((plugin) => {
    // Append Plugins
    _plugins[plugin.name] = { ...plugin, entry: 'index.js' };

    const pluginName = plugin.name;
    const pluginUrl = plugin.url;
    return new Promise((resolve) => {
      console.log(`[${pluginName}] Start Loading...`);
      requirePlugin([`${pluginUrl}`], (b) => {
        console.log(`[${pluginName}] Load Completed!`);
        resolve(b);
      });
    });
  });
  return Promise.all(allpromise);
}

interface MiniStarOptions {
  plugins?: Plugin[];
  pluginUrlPrefix?: string;
}

/**
 * Init Mini Star
 */
export async function initMiniStar(options: MiniStarOptions) {
  if (typeof options.pluginUrlPrefix === 'string') {
    _pluginUrlPrefix = options.pluginUrlPrefix;
  }

  if (Array.isArray(options.plugins) && options.plugins.length > 0) {
    await loadPluginList(options.plugins);
  }
}
