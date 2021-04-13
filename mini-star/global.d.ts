declare namespace ministar {
  interface Module {
    default?: any;
    [key: string]: any;
  }

  type ModuleStatus = 'new' | 'init' | 'loading' | 'loaded';
}

interface Window {
  definePlugin: (
    name: string,
    deps: string[],
    callback: (...args: any[]) => ministar.Module
  ) => void;
  require: (
    deps: string[],
    callback: (...args: ministar.Module[]) => void
  ) => void;
}
