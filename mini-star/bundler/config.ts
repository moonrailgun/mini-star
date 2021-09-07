import path from 'path';
import { cosmiconfigSync } from 'cosmiconfig';
import { Plugin as RollupPlugin } from 'rollup';
const explorer = cosmiconfigSync('ministar');

interface MiniStarConfig {
  scope: string;
  pluginRoot: string;
  outDir: string;
  externalDeps: string[];
  author?: string;
  license?: string;
  rollupPlugins: [];
  buildRollupPlugins?: (defaultPlugins: RollupPlugin[]) => RollupPlugin[];
}

const defaultConfig: MiniStarConfig = {
  scope: 'plugins',
  pluginRoot: process.cwd(),
  outDir: path.resolve(process.cwd(), './dist'),
  externalDeps: [],
  author: undefined,
  license: undefined,
  rollupPlugins: [],
  buildRollupPlugins: undefined,
};

const configResult = explorer.search();
const config: MiniStarConfig = {
  ...defaultConfig,
  ...configResult?.config,
};

export { config };
