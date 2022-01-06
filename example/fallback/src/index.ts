import { initMiniStar } from 'mini-star';

console.log('App start');

initMiniStar({
  plugins: [
    {
      name: 'non-exist-plugin',
      url: '/plugins/non-exist-plugin/index.js',
    },
  ],
})
  .then(() => {
    console.log('Plugin Load Completed');
  })
  .catch(() => {
    console.warn('This branch should not trigger');
  });
