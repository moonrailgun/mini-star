import { loadPluginByUrl } from './loader';

type Module = ministar.Module;
type ModuleStatus = ministar.ModuleStatus;

interface LoadedModuleMap {
  [key: string]: {
    status: ModuleStatus;
    entryFn: (() => void) | null;
    ins: Module | null;
    resolves: ((value: Module | null) => void)[];
  };
}

const loadedModules: LoadedModuleMap = {};

async function loadDep(dep: string): Promise<any> {
  const pluginModule = loadedModules[dep];
  if (pluginModule) {
    if (pluginModule.status === 'init') {
      pluginModule.status = 'loading';
      return new Promise((resolve, reject) => {
        pluginModule.resolves.push(resolve);

        if (typeof pluginModule.entryFn !== 'function') {
          reject('Load dependencies error, this should have a valid ');
          return;
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
      return Promise.resolve(pluginModule.ins);
    }
  } else {
    loadedModules[dep] = {
      resolves: [],
      status: 'new',
      entryFn: null,
      ins: null,
    };

    if (!dep.endsWith('.js') && !dep.startsWith('./')) {
      console.error(
        `[${dep}] Looks like is builtin module, and its cannot load it as remote script.`
      );
    }

    return new Promise((resolve, reject) => {
      loadPluginByUrl(dep)
        .then(() => {
          const pluginModule = loadedModules[dep];
          pluginModule.status = 'loading';
          if (typeof pluginModule.entryFn !== 'function') {
            pluginModule.status = 'loaded';
            pluginModule.ins = null;
            pluginModule.resolves.push(resolve);
            pluginModule.resolves.forEach((_resolve) => {
              // Tell all module which dependency this module
              _resolve(null);
            });
            pluginModule.resolves = [];
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
}

window.require = function (
  deps: string[],
  callback: (...args: Module[]) => void
): void {
  const allPromises = Promise.all(
    deps
      .map((dep, index) => {
        return loadDep(dep);
      })
      .filter(Boolean)
  );

  allPromises
    .then((args) => callback(...args))
    .catch((err) => {
      console.error(err);
      callback([]);
    });
} as any;

window.definePlugin = function (
  name: string,
  deps: string[],
  callback: (...args: any[]) => Module
) {
  if (!loadedModules[name]) {
    loadedModules[name] = {
      resolves: [],
    } as any;
  }
  loadedModules[name].status = 'init';
  loadedModules[name].entryFn = () => {
    const convertedDeps = deps.map((module) => {
      // if (module.startsWith('app/')) {
      //   return convertAppToModuleName(module);
      // }
      // if (module.endsWith('.js') || module.startsWith('./')) {
      //   return convertRelativePathToModuleName(name, module);
      // }
      return module;
    });

    const requireIndex = deps.findIndex((x) => x === 'require');
    const exportsIndex = deps.findIndex((x) => x === 'exports');

    window.require(
      convertedDeps.filter((x) => x !== 'require' && x !== 'exports'),
      (...callbackArgs) => {
        let exports: any = {};
        if (requireIndex !== -1) {
          callbackArgs.splice(
            requireIndex,
            0,
            (deps: string[], callback: (...args: any[]) => void) => {
              const convertedDeps = deps.map((module) => {
                // if (module.startsWith('app/')) {
                //   return convertAppToModuleName(module);
                // }
                // if (module.endsWith('.js') || module.startsWith('./')) {
                //   return convertRelativePathToModuleName(name, module);
                // }
                return module;
              });
              window.require(convertedDeps, callback);
            }
          );
        }
        if (exportsIndex !== -1) {
          callbackArgs.splice(exportsIndex, 0, exports);
        }
        try {
          const ret = callback(...callbackArgs);
          if (exportsIndex === -1 && ret) {
            exports = ret;
          }
        } catch (e) {
          console.error('Plugin init failed:', name, e);
          return Promise.reject(e);
        }

        return Promise.resolve(exports).then((e) => {
          loadedModules[name].status = 'loaded';
          loadedModules[name].ins = e;
          loadedModules[name].resolves.forEach((_resolve) => {
            _resolve(e);
          });
          loadedModules[name].resolves = [];
        });
      }
    );
  };
} as any;
