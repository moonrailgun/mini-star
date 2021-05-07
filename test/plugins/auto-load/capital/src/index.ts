import { initMiniStar } from 'mini-star';

initMiniStar({
  plugins: [
    {
      name: 'first',
      url: 'plugins/first/index.js',
    },
    {
      name: 'third',
      url: 'plugins/third/index.js',
    },
  ],
  pluginUrlBuilder: (pluginName) => `plugins/${pluginName}/index.js`,
});
