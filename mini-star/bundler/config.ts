import { cosmiconfigSync } from 'cosmiconfig';
const explorer = cosmiconfigSync('ministar');

const defaultConfig = {
  scope: 'plugins',
  pluginRoot: process.cwd(),
  author: undefined,
  license: undefined,
};

const configResult = explorer.search();
const config: typeof defaultConfig = {
  ...defaultConfig,
  ...configResult?.config,
};

export { config };
