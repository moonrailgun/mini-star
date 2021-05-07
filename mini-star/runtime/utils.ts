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
  moduleExport: ministar.Module | null
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
export function processModulePath(
  baseModuleName: string,
  path: string
): string {
  if (isPluginModuleName(path)) {
    return path;
  }

  if (path.endsWith('.js') || path.startsWith('./')) {
    return trimDotOfPath(
      baseModuleName + '/',
      !path.endsWith('.js') ? `${path}.js` : path
    );
  }

  return path;
}

/**
 * @example
 * @plugins/any => true
 */
export function isPluginModuleName(fullName: string): boolean {
  if (typeof fullName !== 'string') {
    return false;
  }

  return fullName.startsWith('@plugins/');
}

/**
 * @example
 * @plugins/any => true
 * @plugins/any/other.js => false
 */
export function isPluginModuleEntry(fullName: string): boolean {
  if (typeof fullName !== 'string') {
    return false;
  }

  return fullName.startsWith('@plugins/') && fullName.split('/').length === 2;
}

/**
 * @example
 * @plugins/any => any
 */
export function getPluginName(fullName: string): string | null {
  if (!isPluginModuleName(fullName)) {
    return null;
  }

  const [, name] = fullName.split('/');
  return name;
}
