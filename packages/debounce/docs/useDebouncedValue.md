---
title: useDebouncedValue
nav:
  title: Hooks
  path: /hook
group:
  title: Debounce
  path: /debounce
order: 1
---

# debounce

Provides hooks to debounce value changes, effects or callbacks.

```shell
npm install @huse/debounce
```

## useDebouncedValue

Derive a given value and debounce its update by a given delay.

```typescript
function useDebouncedValue<T>(value: T, wait: number): T
```

Returned value will not update unless the input value stops change longer than `wait`.

<code src="./demo/useDebouncedValue.tsx">




