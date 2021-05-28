import path from 'path';
import { cosmiconfigSync } from 'cosmiconfig';
const explorer = cosmiconfigSync('ministar');

const defaultConfig = {
  scope: 'plugins',
  pluginRoot: process.cwd(),
  outDir: path.resolve(process.cwd(), './dist'),
  extraDeps: [] as string[],
  author: undefined,
  license: undefined,
  rollupPlugins: [],
};

const configResult = explorer.search();
const config: typeof defaultConfig = {
  ...defaultConfig,
  ...configResult?.config,
};

export { config };
