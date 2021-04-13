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
export function loadPluginList(plugins: { name: string; url: string }[]) {
  const allpromise = plugins.map((plugin) => {
    const pluginName = plugin.name;
    const pluginUrl = plugin.url;
    return new Promise((resolve) => {
      console.log(`[${pluginName}] Start Loading...`);
      requirePlugin([pluginUrl], (b) => {
        console.log(`[${pluginName}] Load Completed!`);
        resolve(b);
      });
    });
  });
  return Promise.all(allpromise);
}
