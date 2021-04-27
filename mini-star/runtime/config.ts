const _plugins: Record<string, ministar.Plugin> = {};
let _pluginUrlPrefix: string = '/plugins/';
let _pluginUrlBuilder = (pluginName: string) =>
  `/plugins/${pluginName}/index.js`;

export function applyConfig(config: ministar.GlobalConfig) {
  if (typeof config.pluginUrlPrefix === 'string') {
    _pluginUrlPrefix = config.pluginUrlPrefix;
  }

  if (typeof config.pluginUrlBuilder === 'function') {
    _pluginUrlBuilder = config.pluginUrlBuilder;
  }
}

/**
 * get all pluginList
 */
export function getPluginList(): Record<string, ministar.Plugin> {
  return _plugins;
}

/**
 * get all pluginUrlPrefix
 */
export function getPluginUrlPrefix(): string {
  return _pluginUrlPrefix;
}

/**
 * Get plugin url builder
 * @default
 * (pluginName) => `/plugins/${pluginName}/index.js`
 */
export function getPluginUrlBuilder(pluginName: string): string {
  return _pluginUrlBuilder(pluginName);
}
