import { initMiniStar } from 'mini-star';

console.log('App start');

initMiniStar({
  plugins: [
    {
      name: 'test',
      url: '/plugins/test/index.js',
    },
  ],
})
  .then(() => {
    console.log('Plugin Load Success, Load App');
  })
  .catch(() => {
    console.log('Plugin Load Failed');
  });
