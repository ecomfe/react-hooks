---
title: useMethodsNative
nav:
  title: Hooks
  path: /hook
group:
  title: Methods
  path: /methods
order: 3
---

## useMethodsNative

Like `useMethods` but works without immer support, this is used to wrap state of type which immer cannot handle, such like `Map`, `Set` and custom classes.

As a result of the absence of immer, reducer does not allow in-place mutation to states, it must return a new state object.
