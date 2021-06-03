---
sidebar_position: 2
---

# Shared dependency

The plugin itself can have its own independent dependencies, but in the face of the same dependency as the base project, do I need to re-package the plug-in?

Of course not! `mini-star` chooses to share dependencies. Although there may be hidden dangers of forced upgrade of plug-in dependencies due to the dependency upgrade of the base project, compared with the benefits of code size reduction brought by its sharing, mini-star thinks it is worthwhile

## Shared node_module dependency

```javascript
import { initMiniStar, regDependency, regSharedModule } from 'mini-star';

regDependency('react', () => import('react'));
```

## Shared base project module

```javascript
regSharedModule(
  '@capital/common',
  () => import('./common')
);
```

Note: The dependency of the base project needs to start with `@capital/`, `capital` is the name of the base project by `mini-star`.

You should also obey this rule when using it

```javascript
// in plugin
import * as common from '@capital/common'
```
