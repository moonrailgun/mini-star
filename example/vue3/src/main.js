import { createApp } from 'vue';
import App from './App.vue';
import {initMiniStar, regSharedModule, regDependency} from '../../../mini-star/runtime/index'; // NOTICE: This is becase of vite wanna have a pure module with bundle

regDependency('vue', () => import('vue'))
regSharedModule('@capital/reg', () => import('./reg'))
initMiniStar({
  plugins: [
    {
      name: 'test',
      url: '/plugins/test/index.js',
    },
  ],
}).then(() => {
  console.log('Plugin Load Success');
  createApp(App).mount('#app');
});
