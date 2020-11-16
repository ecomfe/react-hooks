---
title: useLocalStorage
nav:
  title: Hooks
  path: /hook
group:
  title: Local Storage
  path: /local-storage
order: 2
---

# useLocalStorage

Retrieve value from `localStorage` by key, also returns a function to update it.

```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
```

Any update to value from other tabs or frames will be observed via `storage` event and sync to state.

<code src="./demo/useLocalStorage.tsx">
