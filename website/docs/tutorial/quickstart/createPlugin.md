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

## Compile the plugin

In order for the plugin to be loaded correctly, don't forget to use ministar to compile the plug-in code after each modification. By default, it will be packaged and output to the `dist/plugins` directory of the current directory.

You can also modify the output by modifying [outDir](../guide/ministarrc#outdir) in the configuration file.

```bash
npx ministar buildPlugin test

# or

npx ministar buildPlugin all
```
