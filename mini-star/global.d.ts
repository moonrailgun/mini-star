declare namespace ministar {
  type ModuleStatus = 'new' | 'init' | 'loading' | 'loaded';

  interface GlobalConfig {
    pluginUrlPrefix?: string;
    pluginUrlBuilder?: (pluginName: string) => string;
  }

  interface Plugin {
    name: string;
    entry?: string;
    url: string;
  }

  interface Module {
    default?: any;
    [key: string]: any;
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
    callback: (...args: any[]) => ministar.Module
  ) => void;
  requirePlugin: (
    deps: string[],
    callback: (...args: ministar.Module[]) => void
  ) => void;
}
