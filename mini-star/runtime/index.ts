import './types';
import './init';

export { initMiniStar, loadSinglePlugin, loadPluginList } from './loader';
export {
  regDependency,
  regSharedModule,
  getLoadedModules,
  LoadedModuleMap,
} from './helper';
