---
sidebar_position: 3
---

# Plugin dependency

Plugins are allowed to depend on each other, and `mini-star` will automatically handle the topological ordering of plugin dependencies.

## How to use

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

## Custom plugin address auto-completion logic

Custom configuration at runtime using `pluginUrlPrefix` or `pluginUrlBuilder`

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

## Example

- [full example](https://github.com/moonrailgun/mini-star/tree/master/example/full)
