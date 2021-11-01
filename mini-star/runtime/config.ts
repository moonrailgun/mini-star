import type {
  GlobalConfig,
  Plugin,
  PluginLoadError,
  PluginModuleError,
} from './types';

const _plugins: Record<string, Plugin> = {};
let _pluginUrlPrefix = '/plugins/';
let _pluginUrlBuilder = (pluginName: string) =>
  `/plugins/${pluginName}/index.js`;
let _onPluginLoadError = (error: PluginLoadError) => {
  console.error('[MiniStar] Plugin Loaded Error', error);
};

export function applyConfig(config: GlobalConfig) {
  if (typeof config.pluginUrlPrefix === 'string') {
    _pluginUrlPrefix = config.pluginUrlPrefix;
  }

  if (typeof config.pluginUrlBuilder === 'function') {
    _pluginUrlBuilder = config.pluginUrlBuilder;
  }

  if (typeof config.onPluginLoadError === 'function') {
    _onPluginLoadError = config.onPluginLoadError;
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

export function callPluginLoadError(error: PluginLoadError) {
  _onPluginLoadError(error);
}

export function callModuleLoadError(error: PluginModuleError) {
  // reuse same callback
  _onPluginLoadError({
    pluginName: error.moduleName,
    detail: error.detail,
  });
}

/**
 * Get plugin url builder
 * @default
 * (pluginName) => `/plugins/${pluginName}/index.js`
 */
export function getFallbackPluginUrl(pluginName: string): string {
  return _pluginUrlBuilder(pluginName);
}
