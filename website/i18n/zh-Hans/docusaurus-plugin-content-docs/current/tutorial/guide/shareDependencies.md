---
sidebar_position: 2
---

# 共享依赖

插件本身可以有自己独立的依赖，但面对与基座项目具有相同依赖的情况下，还需要重复打包插件么？

当然不！`mini-star`选择共享依赖。虽然可能会有因为基座项目依赖升级导致插件依赖被迫升级的隐患，但是相比其共享带来的代码体积减少的收益, `mini-star`认为这是值得的

## 共享 node_module 依赖

```javascript
import { initMiniStar, regDependency, regSharedModule } from 'mini-star';

regDependency('react', () => import('react'));
```

## 共享基座项目模块

```javascript
regSharedModule(
  '@capital/common',
  () => import('./common')
);
```

注意: 基座项目的依赖需要以`@capital/`开头, `capital`是`mini-star`对基座项目的称呼。

在使用时也应当准守这个规则

```javascript
// in plugin
import * as common from '@capital/common'
```
