---
sidebar_position: 3
---

# Use Plugin

The base project can be any project, just like a normal project.

Just need to initialize the project through `mini-star` in the right place

For example:
```javascript
import { initMiniStar } from 'mini-star';

console.log('App start');

initMiniStar({
  plugins: [
    {
      name: 'test',
      url: '/plugins/test/index.js',
    },
  ],
}).then(() => {
  console.log('Plugin Load Success');
});
```

The list in `plugins` can come from anywhere. This tutorial provides a fixed array for convenience. In the actual production environment, it can come from an `App Store` or a user's manual selection.

After packaging the plug-in and base project, the output structure tree should be like this:

```
.
├── bundle.js
├── bundle.js.map
├── index.html
└── plugins
    └── test
        ├── index.js
        └── index.js.map
```

Start a static file service (such as `http-server`) and take a look.

Console Output:
![](/img/docs/usePlugin.jpg)

- The first line comes from the first `console.log` of the base project
- The second line of `Hello World` comes from the content of the `test` plugin
- The third line comes from the callback when the dock project plug-in is loaded

As you can see, we simply added the plug-in function to an existing project. `mini-star` is so simple!

## Special Mark
- `@capital/*` Base project exported dependencies
- `@plugins/*` Plugin project exported dependencies
