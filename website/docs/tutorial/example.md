---
sidebar_position: 2
---

# Who needs MiniStar

A large-scale project needs to decouple its own business functions, and thinks that through plug-ins, a homogeneous technology stack is used to reassemble into a new function project to realize the front-end architecture form of the micro-kernel architecture.

`MiniStar` is designed to help front-end code plug-in technology to solve a project is not purely functional mix, publish overly complex problems.

## Usage scenarios

The following are some application scenarios that may require `MiniStar` to transform the project:

- If you want to realize the application of the front-end plug-in center, the realization of the front-end code is completely assembled and assembled by the user
- An application that combines special services and basic services. For example, `TRPG Engine` is an instant messaging application composed of trpg modules, voice modules, and basic chat modules. If you want to provide pure chat services, then the original hybrid architecture It is impossible to achieve-either all or nothing.
- A `toB` application, a `SaaS` platform. Customers must have independent two-opening requirements, and do not want to affect the original functions. Then this part of the code can be provided in the form of a plug-in.
- If a project is too large, it is difficult to compile and release. You can use MiniStar to split the project into sub-projects for independent development and independent deployment.
