---
title: useIntendedLazyCallback
nav:
  title: Hooks
  path: /hook
group:
  title: Intended Lazy
  path: /intended-lazy
order: 1
---

# useIntendedLazyCallback

Like [`useIntendedLazyValue`](./use-intended-lazy-value) but accept a callback to make it reference stable.

**Note: The returned callback is UNSAFE to call inside `render` and `useLayoutEffect` as well as its children's corresponding lifecycles.**

```typescript
function useIntendedLazyCallback<T extends Function>(fn: T): T
```

By using `useIntendedLazyCallback` we are able to implement a trick called "performance bridge", that is, a bridge component "swallows" frequetly changing props and make it reference stable in order to make the actual component memoizeble.

<code src="./demo/useIntendedLazyCallback.tsx">
