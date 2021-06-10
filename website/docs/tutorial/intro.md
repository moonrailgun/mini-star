---
sidebar_position: 1
---

# Intro

`mini-star` is a front-end library for the realization of the project's micro-kernel(pluginize), which aims to help you build(or migrate to) a production-usable micro-kernel (plug-in) architecture system more simply and painlessly.

<!-- 抄自: https://segmentfault.com/a/1190000016862735 -->

## What is Microkernel Architecture

It is composed of a group of software programs that minimize the number as much as possible, and they are responsible for providing and implementing various mechanisms and functions required by an operating system. These most basic mechanisms include low-level address space management, thread management, and inter-process communication.

![Microkernel Architecture](/img/docs/intro.png)

## Design concept

The realization of the system is distinguished from the basic operating rules of the system. The way it is implemented is to modularize the core functions, divide them into several independent processes, and run them separately. These processes are called services. All service processes are running in different address spaces.

Making services independent of each other can reduce the degree of coupling between systems, facilitate implementation and debugging, and improve portability. It can prevent a single component from failing and causing the entire system to crash. The kernel only needs to restart this component, which will not affect the functions of other servers and increase the stability of the system. At the same time, business functions can be replaced or added to certain service processes as needed to make the functions more flexible.

In terms of the amount of code, generally speaking, because of simplified functions, the core system uses less code than the integrated system. Less code means fewer hidden bugs.

## ministar's design concept

- Simple

Since both the base project and the plug-in project can achieve the technology stack irrelevant, `ministar` is just a library similar to the jQuery plug-in system for users. You need to load the plug-in and shared dependent components through `ministar/runtime`, and then use `ministar/ Bundler` can build the plug-in project to realize the plug-in transformation of the original system.

- Decoupling/Technology Stack Independent

The core goal of the microkernel is the same as that of the micro front end. It is to disassemble the boulder application into a number of loosely coupled micro applications that can be autonomous. Many designs of ministar adhere to this principle, except for the shared public dependencies and the base project. Ability, the plug-in project has its own context, dependency management, and mutual communication mechanism, so as to ensure that the plug-in has the ability to develop independently. And to ensure the ability to share types with other dependencies.

## Feature

- Out of the box, it can also be customized.
- The technology stack has nothing to do with the application of any technology stack can be `used/accessed`, whether it is React/Vue/Angular/Svelte/JQuery or other frameworks.
- Shared dependencies, the same dependencies only need to be loaded once, reducing unnecessary volume and packaging time
- Make dependency calls between plugins like calling native components
- Packing based on `Rollup`, fast!
- Born for the modern front end. In the past, we exposed methods through windows, now all our code needs to be compiled into modules, and exposure is also through modules
- Topology relies on sorting to prevent timing problems

## Document

- [Official](https://ministar.moonrailgun.com/)
- [Github](https://github.com/moonrailgun/mini-star)
- [微内核架构在大型前端系统中的应用（微前端）](https://segmentfault.com/a/1190000016862735)
