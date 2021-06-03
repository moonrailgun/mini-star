---
sidebar_position: 2
---

# Create Plugin

We can quickly create a new plugin via `cli`.

```bash
npx ministar createPlugin
```

`mini-star` will ask some questions through an interactive terminal program to finally create a plugin.

Plugins will be automatically placed in the `plugins/` directory of the root directory.

Now, let's try to create a plugin called `test`:

![](/img/docs/createPlugin.jpg)

At this time, the `<root>/plugins` directory should be as follows:
```
./plugins
└── test
    ├── package.json
    ├── src
    │   └── index.ts
    └── tsconfig.json
```

One of the simplest plugins is complete, start your plugin journey with `index.ts` as the entrance
