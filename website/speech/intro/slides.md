---
theme: seriph
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shiki
lineNumbers: false
routerMode: 'hash'
monaco: true # default "dev"
info: >
  ## Mini-star

  Pluginize your project

  Learn more at
  [https://ministar.moonrailgun.com/](https://ministar.moonrailgun.com/)
title: Mini-Star
---

<img style="width: 128px; margin: auto;" src="https://ministar.moonrailgun.com/img/logo.svg" />

# Mini-Star

Pluginize your project

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Start your Star Tour <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://ministar.moonrailgun.com/" target="_blank" alt="GitHub"
    class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---

# Frist of All: 什么是插件

<br />

<img width="600" style="margin: auto;" src="https://ministar.moonrailgun.com/assets/images/intro-ef8b51dacc410e2c1874ae3f421cd625.png" />

---

# 为什么我们需要插件机制?

## 在 SaaS 领域中的应用

- 业务组装
  - 不同租户环境搭建不同的插件组装
- 客户二开

## 同构微前端场景

是的，微前端也是一种特殊的插件化。

## 提供插件的应用

<div class="icons">
  <img src="/chrome.jpeg" />
  <img src="/vscode.png" />
</div>

- 各种成熟的编辑器如: idea, vscode
- Chrome
- 宝塔面板
等等


<style>
  .icons {
    display: flex;
    float: right;
  }

  .icons img {
    width: 56px;
    margin: 0 6px;
  }
</style>

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080?1
---

# 以前我们是如何实现插件的

在古早以前，我们是如何让两段在编写时完全不知道对方的代码同时生效?

```html
<script src="foo.js"></script>
<script src="bar.js"></script>
```

简单加载，然后呢？通过共同修改DOM, 或者共同从`window`上取值/赋值来达到插件的作用

---
layout: image-left
image: https://source.unsplash.com/collection/94734566/1920x1080?2
---

# JQuery时代我们又是如何做的

```javascript
$.fn.extend({
  foo: function() {
    const el = $(this);
    // ....
  }
})

$('#div').foo()
```

通过`jQuery`提供的插件系统，我们有了闭包的概念，我们的插件不会像以前那样野蛮生长。

所有的`jQuery`插件能够共同依赖一个`jQuery`。因为`jQuery`是当时的唯一解

---

# 现在，我们又该如何做

<div />

前端技术飞速发展的现在，我们面临无数选择：`React`, `Angular`, `Vue`, `Svelte`...

与此同时，我们又面临一个问题: 因为各种打包工具，我们的代码更加规范了，我们的代码都在自己的作用域中 —— 这不但代表了内部的变量不会污染外部，也同样意味着外部无法访问内部变量。唯一的公共空间就是 `window`。

这不优雅，也不安全。

<!-- 我们不应当允许随便的外部脚本能够访问我们的代码空间 -->

<br />
<br />
<br />

而打包工具更是期望所有的资源都被知晓，而插件系统却是恰恰不期望被知道的存在 —— 他们应当在运行时组合，而不是编译时

---

# 那么, 我们需要什么

<div />

前端不比后端，我们要实现插件机制需要面对比后端更多的挑战:

- 无法动态加载, 前端只能通过正向的引用才能知道一个资源是否存在。而后端可以直接通过文件系统进行检查
- 前端对性能有要求，而后端可以一股脑把所有的资源全都加载

<br />
<br />

我们需要:

- 能够自动加载，并能够对性能进行一部分优化(比如异步加载/按需加载)
- 有一定安全性，但是又能在各个module中进行通信
- 能解决一定的时序性问题，防止同步加载的同时可能存在的依赖问题
- 最好能够减少一些特殊的magic，减少开发中的异构感。

---

# MiniStar 是什么?

`MiniStar` 是一个为实现项目微内核(插件化)前端库，旨在帮助大家能更简单、无痛的构建(或改造成)一个生产可用微内核(插件化)架构系统。

- 📦 **开箱即用** - `MiniStar` 提供了一套自洽的使用方法论，可以开箱即用，也可进行一定配置
- 🏢 **工具完善** - `MiniStar` 拥有一套完整的开发工具链: 从 cli 到 bundler 到 loader，支持插件开发的全流程
- 🎨 **代码精简** - `MiniStar` 类似于 `Redux`, 提供的更多是一套方法论而不是一套大而全的工具。精简意味着了引入成本低、改造成本低，可以根据实际情况进行调整
- 🌏 **技术无关** - 不论是何种框架，`MiniStar`只依赖于最基础的 vanilla js。
- 🎥 **依赖共享** - 节约应用大小与加载时间，不必要的代码我们不打包两遍
- ✈️ **站在巨人肩膀上** - 打包基于`Rollup`, 打包插件快而简单, 并且可以直接接入现成的生态系统。
- 🎯 **为现代工程而生** - 基于`module`形式的引入，开发中几乎无法感觉到区别

<br>
<br>

更多介绍 [官方文档](https://ministar.moonrailgun.com/zh-Hans/docs/tutorial/intro)

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# 真实世界的一个插件示例

```ts {all|1|2|18-24|all}
import React from 'react';
import { regGroupPanel, useCurrentGroupPanelInfo } from '@capital/common';

const PLUGIN_NAME = 'com.msgbyte.webview';

const GroupWebPanelRender = () => {
  const groupPanelInfo = useCurrentGroupPanelInfo();

  if (!groupPanelInfo) {
    return <div>加载失败, 面板信息不存在</div>;
  }

  return (
    <iframe className="w-full h-full bg-white" src={groupPanelInfo.meta?.url} />
  );
};

regGroupPanel({
  name: `${PLUGIN_NAME}/grouppanel`,
  label: '网页面板',
  provider: PLUGIN_NAME,
  extraFormMeta: [{ type: 'text', name: 'url', label: '网址' }],
  render: GroupWebPanelRender,
});
```

<style>
.footnotes-sep {
  @apply mt-20 opacity-10;
}
.footnotes {
  @apply text-sm opacity-75;
}
.footnote-backref {
  display: none;
}
</style>

---

# 开发过程

```mermaid {scale: 1.5}
flowchart LR
  cli创建插件 --> 开发插件 --> 编译插件 --> 主应用加载插件
```

```bash
ministar createPlugin
ministar buildPlugin
```

主应用提供可注入的接口，并把注入函数暴露出来。插件调用注入函数实现具体实现。

在这个过程中，主应用是对插件实现是完全无感知的。这个过程就是我们常说的[控制反转](https://zh.wikipedia.org/wiki/%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC)


---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080?3
---

# MiniStar 的设计哲学

<br />

`MiniStar` 并不是想要提供一套完整的、严格的框架来限制开发者的使用。她只提供一个最基础的实现来帮助开发者完成最基本的需求: 即模块之间的通讯

至于具体做什么，`MiniStar`并不关心，开发者可以用任意他们所能想得到的方式来使用`MiniStar`

就和`Redux`一样，任意框架，任意架构，都可以使用。不设任何限制，并且足够小，可以渐进式对自己的项目进行插件化改造。

---

# 实际代码

<div class="flex">

<div class="w-1/2 p-2">

### 主应用

```js {monaco}
import { regDependency, regSharedModule, initMiniStar } from 'mini-star';

export function initPlugins() {
  regDependency('react', () => import('react'));
  regSharedModule('@capital/common', () => import('./common/index'));

  const plugins = [{
    name: 'foo',
    url: '/plugins/foo/index.js'
  }, {
    name: 'bar',
    url: '/plugins/bar/index.js'
  }]

  return initMiniStar({
    plugins,
  });;
}
```

</div>

<div class="w-1/2 p-2">

### 插件

```js {monaco}
import React from 'react'
import { foo } from '@capital/common';

foo(<div>aaa</div>)
```

### 插件依赖配置

<small>.ministarrc.json</small>

```json {monaco}
{
  "externalDeps": ["react"]
}
```

</div>

</div>

---

# 相比于微前端框架的优势

讲到这里，相信大家都会觉得微内核与微前端有共通之处。

微内核如`MiniStar` 相较于 微前端如`qiankun`/`garfish` 等，两者本质上是为了解决不同场景而存在的。但是在某些情况下他们是有共同点的。

比如他们都有一个基座项目，以及若干个子项目。在某些意义上，微内核架构其实是微前端架构的一个超集。


---

# 微内核对比微前端

|     | MiniStar | qiankun |
| ------- | ---- | --- |
| 项目重点 | 以主项目作为核心业务，插件机制提供额外能力，类似`vscode`/`chrome` | 以子应用为核心业务，基座项目提供路由分发能力，适用于后台管理系统 |
| 打包方式 | 基于`rollup`进行打包 | 任意打包方式均可 |
| 共享依赖 | 使用`module`方式进行共享，并支持懒加载 | 使用`external`进行共享 |
| 多子应用 | 多子应用共存 | 偏向于单子应用 |

---

layout: center
class: text-center
---

# 了解更多

[文档](https://ministar.moonrailgun.com/) · [GitHub](https://github.com/moonrailgun/mini-star)
