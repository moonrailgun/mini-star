/**
 * Create blank ModuleLoader
 * @returns A new ModuleLoader
 */
export function createNewModuleLoader(): ministar.ModuleLoader {
  return {
    resolves: [],
    status: 'new',
    entryFn: null,
    ins: null,
  };
}

/**
 * Set module loader status to `loaded`
 */
export function setModuleLoaderLoaded(
  moduleLoader: ministar.ModuleLoader,
  moduleExport: {} | null
) {
  moduleLoader.status = 'loaded';
  moduleLoader.ins = moduleExport;
  if (Array.isArray(moduleLoader.resolves)) {
    moduleLoader.resolves.forEach((_resolve) => {
      _resolve(moduleExport);
    });
  }
  moduleLoader.resolves = [];
}

function trimDotOfPath(parent: string, self: string) {
  if (!self.startsWith('.')) {
    return self;
  }
  const parentList = parent.split('/');
  const selfList = self.split('/');
  parentList.pop();
  const selfRet: string[] = [];
  selfList.forEach((item) => {
    if (item === '..') {
      parentList.pop();
    }
    if (item !== '..' && item !== '.') {
      selfRet.push(item);
    }
  });
  return parentList.concat(selfRet).join('/');
}

/**
 * A function how to process module path to real path
 */
export function processModulePath(moduleName: string, path: string): string {
  if (path.startsWith('@plugin/')) {
    const name = path.split('/')[1];
    return `${name}/index.js`;
  }

  if (path.endsWith('.js') || path.startsWith('./')) {
    return trimDotOfPath(
      moduleName,
      !path.endsWith('.js') ? `${path}.js` : path
    );
  }

  return path;
}
