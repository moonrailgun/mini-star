---
sidebar_position: 5
---

# Reduce plugin entry code

When using `MiniStar`, in order to ensure the timing of the code, it may be necessary to load the plug-in code before loading the main project code.

At this time, the size of the plug-in code itself is very important.

We should try our best to ensure the size of the plug-in code entry file.

### Dynamic loading

Use dynamic loading as much as possible to split internal logic


```javascript
import('/path/to/other/logic').then(() => {
  // ...
})
```

### Asynchronous component

If you are using a UI framework such as `React`, you can use a dynamically loaded asynchronous component to instead of the original direct introduction.
- [@loadable/component](https://www.npmjs.com/package/@loadable/component)
