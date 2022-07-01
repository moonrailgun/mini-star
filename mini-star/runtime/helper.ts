import {
  getPluginList,
  getFallbackPluginUrl,
  getPluginUrlPrefix,
  callModuleLoadError,
  getRemoveScriptDomOnLoaded,
} from './config';
import type { Module, ModuleLoader } from './types';
import {
  createNewModuleLoader,
  getPluginName,
  isFullUrl,
  isPluginModuleEntry,
  mergeUrl,
  processModulePath,
  setModuleLoaderLoaded,
  setModuleLoaderLoadError,
} from './utils';

export interface LoadedModuleMap {
  [key: string]: ModuleLoader;
}

const loadedModules: LoadedModuleMap = {};

if (process.env.NODE_ENV === 'development') {
  // Just for debug.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__ministar_loadedModules = loadedModules;
}

/**
 * get all loaded modules
 */
export function getLoadedModules(): LoadedModuleMap {
  return loadedModules;
}

function generateModuleName(scriptUrl: string): string {
  const pluginList = getPluginList();
  const searchedPlugin = Object.entries(pluginList).find(
    ([, value]) => value.url === scriptUrl
  );
  if (searchedPlugin === undefined) {
    // Cannot find Plugin
    return scriptUrl;
  } else {
    return searchedPlugin[1].name;
  }
}

function loadPluginByUrl(url: string): Promise<Event> {
  return new Promise((resolve, reject) => {
    const scriptDom = document.createElement('script');
    scriptDom.src = url;
    scriptDom.onload = (e) => {
      resolve(e);
      if (getRemoveScriptDomOnLoaded()) {
        document.body.removeChild(scriptDom);
      }
    };
    scriptDom.onerror = (e) => {
      reject(e);
    };

    document.body.appendChild(scriptDom);
  });
}

/**
 * Load Dependency Module
 */
function loadDependency(dep: string): void | Promise<any> {
  const moduleName = generateModuleName(dep);
  const pluginName = getPluginName(moduleName);

  if (dep.startsWith('@plugins/')) {
    dep = dep.replace('@plugins/', getPluginUrlPrefix());
  }

  if (!(moduleName in loadedModules)) {
    // Not exist
    loadedModules[moduleName] = createNewModuleLoader();

    const pluginInfo =
      typeof pluginName === 'string' ? getPluginList()[pluginName] : null;

    if (isPluginModuleEntry(moduleName)) {
      // Is Plugin Entry
      if (pluginInfo === null) {
        console.error(`[${moduleName}] Looks like not a valid module name.`);
        return;
      }

      /**
       * Try to load plugin:
       * - `pluginInfo` will be `object` | `undefined`
       *  - if `undefined`, will not found plugin in `getPluginList()`
       * - Try to get plugin url in plugin list.
       * - If url not define or this plugin is has another dependencies will generate plugin url with function `getFallbackPluginUrl`.
       */
      if (pluginInfo === undefined) {
        dep = getFallbackPluginUrl(pluginName!); // here must be have value
      } else {
        dep = pluginInfo.url ?? getFallbackPluginUrl(pluginInfo.name);
      }
    } else {
      // Async module
      if (!dep.startsWith('./') && !dep.endsWith('.js')) {
        console.error(
          `[${dep}] Cannot load, please checkout your code in ${moduleName}(${pluginInfo?.url}).`
        );
        return;
      }

      if (pluginInfo && isFullUrl(pluginInfo.url ?? '')) {
        dep = mergeUrl(pluginInfo.url, dep);
      }
    }

    return new Promise((resolve, reject) => {
      loadPluginByUrl(dep)
        .then(() => {
          const pluginModule = loadedModules[moduleName];
          pluginModule.status = 'loading';

          if (typeof pluginModule.entryFn !== 'function') {
            pluginModule.resolves.push(resolve);
            setModuleLoaderLoaded(pluginModule, null);
            return;
          }
          pluginModule.resolves.push(resolve);
          pluginModule.entryFn();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // Has been load
  // Update plugin module status
  const pluginModule = loadedModules[moduleName];

  if (pluginModule.status === 'init') {
    pluginModule.status = 'loading';
    return new Promise((resolve, reject) => {
      pluginModule.resolves.push(resolve);

      if (typeof pluginModule.entryFn !== 'function') {
        reject('Load dependencies error, this should have a valid');
        return null;
      }

      pluginModule.entryFn();
    });
  } else if (
    pluginModule.status === 'loading' ||
    pluginModule.status === 'new'
  ) {
    return new Promise((resolve) => {
      pluginModule.resolves.push(resolve);
    });
  } else if (pluginModule.status === 'loaded') {
    return Promise.resolve(pluginModule.module);
  }
}

export function requirePlugin(
  deps: string[],
  onSuccess: (...args: Module[]) => void,
  onError: (err: Error) => void
): void {
  const allPromises = Promise.all(
    deps
      .map((dep) => {
        return loadDependency(dep);
      })
      .filter(Boolean)
  );

  allPromises
    .then((args) => onSuccess(...args))
    .catch((err) => {
      console.error(err);
      onError(err);
    });
}

export function definePlugin(
  name: string,
  deps: string[],
  callback: (...args: any[]) => Module
) {
  const moduleName = name;

  if (arguments.length === 2) {
    // AMD No Deps case
    // Should neven run into here because of
    callback = deps as any;
    deps = [];
  }

  if (!loadedModules[moduleName]) {
    loadedModules[moduleName] = createNewModuleLoader();
  }
  loadedModules[moduleName].status = 'init';
  loadedModules[moduleName].entryFn = () => {
    const convertedDeps = deps.map((module) => processModulePath(name, module));

    const requireIndex = deps.findIndex((x) => x === 'require');
    const exportsIndex = deps.findIndex((x) => x === 'exports');

    const requiredDeps = convertedDeps.filter(
      (x) => x !== 'require' && x !== 'exports'
    );

    requirePlugin(
      requiredDeps,
      (...callbackArgs) => {
        let exports: Record<string, any> = {};

        // Replace require
        if (requireIndex !== -1) {
          (callbackArgs as any[]).splice(
            requireIndex,
            0,
            (deps: string[], callback: (...args: any[]) => void) => {
              const convertedDeps = deps.map((module) =>
                processModulePath(name, module)
              );
              requirePlugin(convertedDeps, callback, (err) =>
                callModuleLoadError({
                  moduleName,
                  detail: err,
                })
              );
            }
          );
        }

        // Replace exports
        if (exportsIndex !== -1) {
          callbackArgs.splice(exportsIndex, 0, exports);
        }

        try {
          const ret = callback(...callbackArgs);
          if (exportsIndex === -1 && ret) {
            exports = ret;
          }
          setModuleLoaderLoaded(loadedModules[name], exports);
        } catch (e: any) {
          callModuleLoadError({
            moduleName: name,
            detail: new Error(e),
          });
          setModuleLoaderLoadError(loadedModules[name]);
        }
      },
      (err) => {
        callModuleLoadError({
          moduleName,
          detail: err,
        });
      }
    );
  };
}

/**
 * Register Dependency from capital
 */
export function regDependency(name: string, fn: () => Promise<Module>) {
  if (loadedModules[name]) {
    console.warn('[ministar] Duplicate registry:', name);
  }
  loadedModules[name] = {
    status: 'init',
    module: null,
    resolves: [],
    entryFn: () => {
      fn().then((module) => {
        setModuleLoaderLoaded(loadedModules[name], module);
      });
    },
  };
}

/**
 * Register Shared Module from capital.
 * Its will auto try to add @capital before module name.
 */
export function regSharedModule(name: string, fn: () => Promise<Module>) {
  if (
    !name.startsWith('@capital') &&
    !name.startsWith('@') &&
    !name.startsWith('/')
  ) {
    // Auto Prefix
    name = `@capital/${name}`;
  }

  regDependency(name, fn);
}
