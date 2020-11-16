---
title: useImmerReducer
nav:
  title: Hooks
  path: /hook
group:
  title: Immer
  path: /immer
order: 3
---

# useImmerReducer

A `useReducer` bound to immer, direct mutation of state is allowed inside reducer.

```typescript
type ImmerReducer<S = any, A = any> = (state: S, action: A) => S | void;
function useImmerReducer<S = any, A = any>(reducer: ImmerReducer<S, A>, initialState: S, initializer?: () => S): [S, Dispatch<S>];
```

Some differences with `useReducer`:

1. Requires a single `action` argument in reducer.
2. reducer can mutate state directly.
3. `initializer` won't receive `initialState` as its argument.

<code src='./demo/useImmerReducer.tsx'>