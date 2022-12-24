import {
  getPluginList,
  getFallbackPluginUrl,
  getPluginUrlPrefix,
  callModuleLoadError,
  getRemoveScriptDomOnLoaded,
} from './config';
import type { Module, ModuleLoader } from './types';
import {
  getPluginName,
  isFullUrl,
  isPluginModuleEntry,
  mergeUrl,
  processModulePath,
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

/**
 * load plugin script with origin script
 * its will not cors problem(rather than fetch and eval, but cannot include sandbox or other post process)
 */
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
 * Because we cannot get result of script eval result
 * so we use this to try to make sure script eval.
 *
 * TODO: use sandbox and eval to remove its logic
 */
const interval = [0, 10, 100, 200, 500, 1000, 2000];
function tryToGetModule(moduleName: string): Promise<boolean> {
  let i = 0;

  function loop(): Promise<void> {
    if (i > interval.length) {
      // Always can not get module
      console.error(`Eval Timeout, moduleName: [${moduleName}]`);
      return Promise.reject();
    }

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (loadedModules[moduleName]) {
          resolve();
        } else {
          i++;
          resolve(loop());
        }
      }, interval[i]);
    });
  }

  return loop()
    .then(() => true)
    .catch(() => false);
}

const loadingDependency = new Map<string, Promise<Module>>();

/**
 * Load Dependency Module
 */
async function loadDependency(dep: string): Promise<Module> {
  const moduleName = generateModuleName(dep);
  const pluginName = getPluginName(moduleName);

  if (dep.startsWith('@plugins/')) {
    dep = dep.replace('@plugins/', getPluginUrlPrefix());
  }

  /**
   * Load script with dom
   */
  async function loadDependencyScript() {
    const pluginInfo =
      typeof pluginName === 'string' ? getPluginList()[pluginName] : null;

    if (isPluginModuleEntry(moduleName)) {
      // Is Plugin Entry
      if (pluginInfo === null) {
        throw new Error(`[${moduleName}] Looks like not a valid module name.`);
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
        throw new Error(
          `[${dep}] Cannot load, please checkout your code in ${moduleName}(${pluginInfo?.url}).`
        );
      }

      if (pluginInfo && isFullUrl(pluginInfo.url ?? '')) {
        dep = mergeUrl(pluginInfo.url, dep);
      }
    }

    await loadPluginByUrl(dep);

    return new Promise<Module>((resolve, reject) => {
      tryToGetModule(moduleName)
        .then((has) => {
          if (!has) {
            reject(new Error(`Cannot load script: ${moduleName}`));
            return;
          } else {
            resolve(loadedModules[moduleName]._promise);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  if (loadingDependency.has(moduleName)) {
    // Is Loading
    return loadingDependency.get(moduleName) as Promise<Module>;
  }

  if (!(moduleName in loadedModules)) {
    // Not load
    const p = loadDependencyScript();
    loadingDependency.set(moduleName, p);
    return p.then((res) => {
      loadingDependency.delete(moduleName);
      return res;
    });
  }

  // defined
  const pluginModule = loadedModules[moduleName];
  return pluginModule._promise;
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
    .then((args) => {
      onSuccess(...args);
    })
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

  if (loadedModules[moduleName]) {
    console.warn(`${moduleName} has been loaded. Skipped!`);
    return;
  }

  loadedModules[moduleName] = {
    module: null,
    _promise: new Promise<Module>((resolve) => {
      const convertedDeps = deps.map((module) =>
        processModulePath(name, module)
      );

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

            resolve(exports);
            // setModuleLoaderLoaded(loadedModules[name], exports);
          } catch (e: any) {
            callModuleLoadError({
              moduleName: name,
              detail: new Error(e),
            });
            // setModuleLoaderLoadError(loadedModules[name]);
          }
        },
        (err) => {
          callModuleLoadError({
            moduleName,
            detail: err,
          });
        }
      );
    }).then((exportedModule) => {
      loadedModules[moduleName].module = exportedModule;
      return exportedModule;
    }),
  };

  return loadedModules[moduleName]._promise;
}

/**
 * Register Dependency from node_module.
 * make sure declare it in `externalDeps`
 */
export function regDependency(name: string, fn: () => Promise<Module>) {
  if (loadedModules[name]) {
    console.warn('[ministar] Duplicate registry:', name);
  }
  loadedModules[name] = {
    module: null,
    _promise: fn().then((exportedModule) => {
      loadedModules[name].module = exportedModule;
      return exportedModule;
    }),
  };
}

/**
 * Register Shared Module from capital.
 * Its will auto try to add @capital before module name(if you not declare it).
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
