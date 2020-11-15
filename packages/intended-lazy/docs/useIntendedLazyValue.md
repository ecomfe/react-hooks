---
title: useIntendedLazyValue
nav:
  title: Hooks
  path: /hook
group:
  title: Intended Lazy
  path: /intended-lazy
order: 1
---

# useIntendedLazyValue

Wrap a value to a lazy evaluated function, this function is reference stable so that it won't trigger re-render to a component decorated with `memo`.

**Note: The value is updated after commit phase, this means it's UNSAFE to read value in comonent's `render` and `useLayoutEffect` as well as its children's corresponding lifecycles.**

```typescript
function useIntendedLazyValue<T>(value: T): () => T
```

In most cases, this is a performance trick to reduce child component's re-renders when this value is used in a event callback triggered by user, by ensuering event callback is always invoked after DOM is updated, the value is almost always in sync.

We intentionally naming this hook in this way to warn any users about its unsafety in practice, the React team is working on a better solution, till then we will deprecate this hook, a long name can help you to find out all references and replacement with the official solution.

<code src="./demo/useIntendedLazyValue.tsx">
