import { cosmiconfigSync } from 'cosmiconfig';
const explorer = cosmiconfigSync('ministar');

const defaultConfig = {
  scope: 'template',
};

const configResult = explorer.search();
const config = configResult?.config ?? defaultConfig;

export { config };
