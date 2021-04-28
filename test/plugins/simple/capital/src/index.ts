import { initMiniStar } from 'mini-star/runtime';

console.log('Hello World');

initMiniStar({
  plugins: [
    {
      name: 'demo',
      url: 'plugins/demo/index.js',
    },
  ],
});
