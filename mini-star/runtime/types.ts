export type ModuleStatus =
  | 'new' // when plugin dep created
  | 'init' // when plugin load in first time
  | 'loading' // when plugin downloaded and before run entryFn
  | 'loaded' // when plugin run entryFn completed
  | 'error'; // when plugin load error

export interface PluginLoadError {
  pluginName: string;
  detail: Error;
}

export interface PluginModuleError {
  moduleName: string;
  detail: Error;
}

export interface GlobalConfig {
  /**
   * Whether if remove script dom on loaded
   * Useful make dom clean
   */
  removeScriptDomOnLoaded?: boolean;
  /**
   * plugin url prefix, will replace `@plugin/xxx` to `${pluginUrlPrefix}/xxx`
   */
  pluginUrlPrefix?: string;
  /**
   * Build plugin url with function, for import other plugin in plugin
   */
  pluginUrlBuilder?: (pluginName: string) => string;
  /**
   * Plugin load error callback
   */
  onPluginLoadError?: (error: PluginLoadError) => void;
}

export interface Plugin {
  /**
   * Plugin Name
   */
  name: string;
  /**
   * Plugin Url
   */
  url: string;
}

export interface Module {
  default?: unknown;
  [key: string]: unknown;
}

export interface ModuleLoader {
  _promise: Promise<Module>;
  module: Module | null;
}
