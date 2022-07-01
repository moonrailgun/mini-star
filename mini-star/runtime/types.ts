export type ModuleStatus = 'new' | 'init' | 'loading' | 'loaded' | 'error';

export interface PluginLoadError {
  pluginName: string;
  detail: Error;
}

export interface PluginModuleError {
  moduleName: string;
  detail: Error;
}

export interface GlobalConfig {
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
