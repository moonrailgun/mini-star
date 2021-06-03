---
sidebar_position: 1
---

# 稍后加载

一般情况下，我们只需要在开始的时候执行`initMiniStar`即可, 但是有时候我们需要在后续动态追加插件。

考虑一下这个场景: 用户打开了插件中心，选择了一个插件，然后点击了一下安装。

对于如果需要用户去刷新页面才能生效的话，是一种非常不好的用户体验。最好的体验是用户点击按钮，即可立即应用插件。

如下接口可以在后续动态追加插件:
```javascript
import { initMiniStar } from 'mini-star';
loadSinglePlugin({ name: 'test', url: '/plugins/test/index.js' });
// Or
loadPluginList([{ name: 'test', url: '/plugins/test/index.js' }]);
```
