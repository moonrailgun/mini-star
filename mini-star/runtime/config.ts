import type { GlobalConfig, Plugin } from './types';

const _plugins: Record<string, Plugin> = {};
let _pluginUrlPrefix = '/plugins/';
let _pluginUrlBuilder = (pluginName: string) =>
  `/plugins/${pluginName}/index.js`;

export function applyConfig(config: GlobalConfig) {
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
 * Get plugin url builder
 * @default
 * (pluginName) => `/plugins/${pluginName}/index.js`
 */
export function getFallbackPluginUrl(pluginName: string): string {
  return _pluginUrlBuilder(pluginName);
}
