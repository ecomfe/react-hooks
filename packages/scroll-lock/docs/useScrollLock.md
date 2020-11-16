---
title: useScrollLock
nav:
  title: Hooks
  path: /hook
group:
  title: Scroll Lock
  path: /scroll-lock
order: 2
---

# useScrollLock

Pass a `boolean` value to lock scroll on document.

```typescript
function useScrollLock(lock: boolean): void
```

When `lock` is `true` scroll will be locked, `overflow` style will be reverted when `lock` becomes `false` or component is unmounted.

If an other modification of `overflow` style happens after scroll lock, `useScrollLock` will not revert the style.

<code src='./demo/useScrollLock.tsx'>
