---
sidebar_position: 3
---

# Why is MiniStar

`MiniStar` is a simple and open source front-end progressive plug-in framework.

It provides a complete set of `cli/runtime/bundler` development links. If you want to customize it, it's very simple. And MiniStar's design is gradual, even existing projects can be plug-ined little by little without having to complete them all at once.

## Difference from Mini Program

`MiniStar` and `Mini Program` are more similar, because they both develop and deploy some functions as independent sub-projects. The difference is that the communication between `MiniStar` and the main program is closer, and the content to be reused is more. And there is no complicated runtime.

`Mini Program` is more suitable for occasions with higher security scenarios, while `MiniStar` plugins trust the plugin code more.

In addition, small programs are more suitable for `app`, while `MiniStar` is born for `web`

## Difference from qiankun

`MiniStar` is a micro-kernel framework, and `qiankun` is a micro front-end framework

`MiniStar` pays more attention to the reuse of dependencies and the provision of main application capabilities, and emphasizes the isomorphism of the technology stack

`qiankun` is to solve the scenario where multiple heterogeneous sub-applications are running in the same main application. Pay more attention to the isolation of dependencies and code

They are two solutions, and they solve different problems.

If you are looking for a micro front-end solution, you can look at [`qiankun`](https://qiankun.umijs.org/)

## Difference from requirejs

The implementation of `requirejs` is very similar to that of `MiniStar`.

But the smallest combination unit of `requirejs` is file

The smallest unit of `MiniStar` is a module.

`MiniStar` is more in line with modern front-end module ideas, and will not affect existing code habits.

## Who designed MiniStar's icon

I found it on `iconfont`.
