---
sidebar_position: 3
---

# 为什么是MiniStar

`MiniStar`是一个简单的且开源的前端渐进式插件化框架。

它提供了一套完整的`cli/runtime/bundler`开发链路。如果想要定制化，也非常简单。而且MiniStar的设计是渐进式的, 就算是已有的项目也能一点点进行插件化进程而无需一次完成。

## 与小程序的区别

`MiniStar`和`小程序`比较像，因为他们都是将部分功能作为独立的子项目进行开发与部署。区别在于`MiniStar`与主程序的通讯更加紧密，复用的内容更加多。且没有复杂的运行时。

`小程序`更加适合对于安全场景更加高的场合，而`MiniStar`的插件则更加信任插件代码。

另外小程序更加适合`app`, 而`MiniStar`则是为`web`而生

## 与qiankun的区别

`MiniStar`是一款微内核框架，`qiankun`则是一款微前端框架

`MiniStar`更加注重依赖的复用与主应用能力的提供，更加强调技术栈的同构性

`qiankun`是为了解决多个异构子应用在同一个主应用运行的场景。更加注重依赖与代码的隔离

他们是两种解决方案，解决的问题是不一样的。

如果是在寻求微前端的解决方案，可以看下 [`qiankun`](https://qiankun.umijs.org/)

## 与requirejs的区别

`requirejs`的实现与`MiniStar`非常像。

但是`requirejs`的最小组合单位是文件

而`MiniStar`的最小组合单位是模块。

`MiniStar`更加符合现代前端的模块思想，而且不会对现有的代码习惯造成影响。

## MiniStar的icon是谁设计的

我在`iconfont`上随便找的。
