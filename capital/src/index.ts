import './console-ui';
import { sayHello } from './other';
import { initMiniStar, regSharedModule } from 'mini-star/runtime';
import './index.css';

console.log('Hello World');

sayHello('Player');

const pluginList = [
  // Plugin List Below
  'core',
  'alert',
  'test',
].map((name) => ({
  name,
  url: `/plugins/${name}/index.js`,
}));

regSharedModule('@capital/shared', () => import('./shared'));

initMiniStar({
  plugins: pluginList,
});
