---
title: useDebouncedEffect
nav:
  title: Hooks
  path: /hook
group:
  title: Debounce
  path: /debounce
order: 2
---

# useDebouncedEffect

Runs a callback when a value changed with a delay, effect will be canceled if value is changed again within delay.

```typescript
function useDebouncedEffect<T>(callback: () => void | (() => void), value: T, wait: number): void
```

Unlike `useEffect`, `useDebouncedEffect` accepts only one dependency value.

Still `callback` can return a clean-up function, this function is called **immediately when value changes without delay**.

<code src="./demo/useDebouncedEffect.tsx">