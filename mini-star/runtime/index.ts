import './types';
import './init';

export { initMiniStar, loadSinglePlugin, loadPluginList } from './loader';
export { regDependency, regSharedModule, getLoadedModules } from './helper';
export type { LoadedModuleMap } from './helper';
