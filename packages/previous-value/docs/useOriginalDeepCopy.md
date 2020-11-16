---
title: useOriginalDeepCopy
nav:
  title: Hooks
  path: /hook
group:
  title: Previous Value
  path: /previous-value
order: 4
---

# useOriginalDeepCopy

This is a short cut version of `useOriginalCopy` using a deep equality function.

```typescript
type CustomEquals<T> = (previous: T | undefined, current: T) => boolean;
function useOriginalDeepCopy<T>(value: T): T;
```

In short, this is exactly the same as:

```javascript
return useOriginalCopy(value, deepEquals)
```