---
title: useImmerReducer
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Immer
  path: /immer
order: 3
---

# useImmerReducer

将immer集成进`useReducer`, 允许在reducer内部直接修改state。

```typescript
type ImmerReducer<S = any, A = any> = (state: S, action: A) => S | void;
function useImmerReducer<S = any, A = any>(reducer: ImmerReducer<S, A>, initialState: S, initializer?: () => S): [S, Dispatch<S>];
```

和 `useReducer`的不同点:

1. 需要在reducer内传入`action`参数。
2. reducer可以直接修改state值。
3. `initializer` 无需接收 `initialState` 作为它的参数。

<code src='./demo/useImmerReducer.tsx'>