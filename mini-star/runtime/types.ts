export type ModuleStatus = 'new' | 'init' | 'loading' | 'loaded';

export interface GlobalConfig {
  pluginUrlPrefix?: string;
  pluginUrlBuilder?: (pluginName: string) => string;
}

export interface Plugin {
  /**
   * Plugin Name
   */
  name: string;
  /**
   * Plugin Url
   */
  url?: string;
}

export interface Module {
  default?: unknown;
  [key: string]: unknown;
}

export interface ModuleLoader {
  status: ModuleStatus;
  entryFn: (() => void) | null;
  ins: Module | null;
  resolves: ((value: Module | null) => void)[];
}
