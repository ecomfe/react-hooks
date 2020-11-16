---
title: usePreviousValue
nav:
  title: Hooks
  path: /hook
group:
  title: Previous Value
  path: /previous-value
order: 2
---

# usePreviousValue

Prevoius value if sometimes useful in react development, like to derive a state,
or to determine transition duration on how value is changed.

This hook returns the previous value of given argument.

```typescript
function usePreviousValue<T>(value: T): T | undefined
```

**Note: this hook is not designed to get the "previous different version", the previous value may be the same of given value.**

<code src='./demo/usePreviousValue.tsx'>