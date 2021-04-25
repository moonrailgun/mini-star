import './console-ui';
import { sayHello } from './other';
import { initMiniStar } from 'mini-star';
import './index.css';

console.log('Hello World');

sayHello('Player');

const pluginList = ['core' /*, 'cowsay', 'test'*/].map((name) => ({
  name,
  url: `${name}/index.js`,
}));

initMiniStar({
  plugins: pluginList,
});
