---
sidebar_position: 1
---

# Load Later

Under normal circumstances, we only need to execute `initMiniStar` at the beginning, but sometimes we need to dynamically add plugins later.

Consider this scenario: the user opens the plug-in center, selects a plug-in, and clicks to install it.

If the user needs to refresh the page to take effect, it is a very bad user experience. The best experience is that the user clicks the button and the plug-in can be applied immediately.

The following interface can dynamically add plug-ins in the future:
```javascript
import { initMiniStar } from 'mini-star';
loadSinglePlugin({ name: 'test', url: '/plugins/test/index.js' });
// Or
loadPluginList([{ name: 'test', url: '/plugins/test/index.js' }]);
```
