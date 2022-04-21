---
sidebar_position: 3
---

# 插件依赖

插件之间允许相互依赖，`mini-star` 会自动处理插件依赖的拓扑排序。

## 使用方式

**./plugins/alert/src/index.ts**:
```typescript
import Swal from 'sweetalert2';

export function alert(text: string) {
  Swal.fire(text);
}

```

**./plugins/test/src/index.ts**:
```typescript
import { alert as myAlert } from '@plugins/alert';

console.log('myAlert', myAlert);
myAlert('Test Alert');
```

## 自定义插件的地址自动补全逻辑

使用 `pluginUrlPrefix` 或者 `pluginUrlBuilder` 在运行时中进行自定义配置

```typescript
import { initMiniStar } from 'mini-star';

initMiniStar({
  pluginUrlPrefix: '/path/to/pluginDir'
})
```

```typescript
import { initMiniStar } from 'mini-star';

initMiniStar({
  pluginUrlBuilder: (pluginName: string) => '/path/to/pluginDir'
})
```


## 示例

- [完整示例](https://github.com/moonrailgun/mini-star/tree/master/example/full)
