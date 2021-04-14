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
