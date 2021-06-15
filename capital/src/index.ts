import { appendToolButton } from './toolbar';
import './console-ui';
import { initMiniStar, regSharedModule, loadSinglePlugin } from 'mini-star';
import './index.css';

const pluginList = [
  // Plugin List Below
  'core',
].map((name) => ({
  name,
  url: `/plugins/${name}/index.js?v=1`,
}));

regSharedModule('@capital/shared', () => import('./shared'));

initMiniStar({
  plugins: pluginList,
});
appendToolButton('Load plugin: test', () => {
  loadSinglePlugin({
    name: 'test',
    url: `/plugins/test/index.js`,
  });
});
appendToolButton('Refresh Page', () => {
  window.location.reload();
});
