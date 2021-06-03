---
sidebar_position: 2
---

# 创建插件

我们可以通过`cli`快速创建一个新的插件。

```bash
npx ministar createPlugin
```

`mini-star` 会通过一个交互式终端程序询问一些问题, 以最后创建一个插件。

插件会自动放在根目录的 `plugins/` 目录下。

现在，我们尝试创建一个名为 `test` 的插件:

![](/img/docs/createPlugin.jpg)

此时 `<root>/plugins` 目录应当如下:
```
./plugins
└── test
    ├── package.json
    ├── src
    │   └── index.ts
    └── tsconfig.json
```

一个最简单的插件完成了，让我们以 `index.ts` 为入口开始你的插件之旅
