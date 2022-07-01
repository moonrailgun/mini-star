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
  removeScriptDomOnLoaded?: boolean;
  pluginUrlPrefix?: string;
  pluginUrlBuilder?: (pluginName: string) => string;
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
  status: ModuleStatus;
  entryFn: (() => void) | null;
  module: Module | null;
  resolves: ((value: Module | null) => void)[];
}
