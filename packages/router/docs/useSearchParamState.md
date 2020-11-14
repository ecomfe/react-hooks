---
title: useSearchParamState
nav:
  title: Hooks
  path: /hook
group:
  title: Router
  path: /router
order: 7
---

## useSearchParamState

Wrap a single search params as a react state.

```typescript
function useSearchParamState(key: string, options?: NavigateOptions): [string | null, (value: string) => void];
```

When a state is stored in search params, using this hook works just like `useState`.

<code src='./demo/useSearchParamState.tsx'>