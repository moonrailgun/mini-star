declare namespace ministar {
  type ModuleStatus = 'new' | 'init' | 'loading' | 'loaded';

  interface GlobalConfig {
    pluginUrlPrefix?: string;
    pluginUrlBuilder?: (pluginName: string) => string;
  }

  interface Plugin {
    /**
     * Plugin Name
     */
    name: string;
    /**
     * Plugin Url
     */
    url: string;
  }

  interface Module {
    default?: unknown;
    [key: string]: unknown;
  }

  interface ModuleLoader {
    status: ModuleStatus;
    entryFn: (() => void) | null;
    ins: Module | null;
    resolves: ((value: Module | null) => void)[];
  }
}

interface Window {
  definePlugin: (
    name: string,
    deps: string[],
    callback: (...args: unknown[]) => ministar.Module
  ) => void;
  requirePlugin: (
    deps: string[],
    callback: (...args: ministar.Module[]) => void
  ) => void;
}
