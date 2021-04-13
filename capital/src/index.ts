import { sayHello } from './other';
import { loadPluginList } from 'mini-star';

console.log('Hello World');

sayHello('Player');

const pluginList = ['core', 'cowsay', 'test'].map((name) => ({
  name,
  url: `/plugins/${name}`,
}));

loadPluginList(pluginList);
