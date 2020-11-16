---
title: usePreviousEquals
nav:
  title: Hooks
  path: /hook
group:
  title: Previous Value
  path: /previous-value
order: 5
---

# usePreviousEquals

Determine whether value is changed in current render.

```typescript
type CustomEquals<T> = (previous: T | undefined, current: T) => boolean
function usePreviousEquals<T>(value: T, equals?: CustomEquals<T>): boolean;
```

By default a shallow compare is performed to check equality, a custom equality function can be provided.