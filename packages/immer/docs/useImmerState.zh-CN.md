---
title: useImmerState
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Immer
  path: /immer
order: 2
---

# useImmerState

类似 `useState` 但是具备了直接更新的能力。

```typescript
type ImmerStateProducer<S> = (state: S) => S | void;
type SetImmerState<S> = (next: S | ImmerStateProducer<S>) => void;
type ImmerState<S> = [S, SetImmerState<S>];
function useImmerState<S = any>(initialState: S | (() => S)): ImmerState<S>;
```

这与`useState`的工作原理完全相同,唯一不同的是,当一个函数被传递给`setState`时,它可以直接改变状态。

<code src='./demo/useImmerState.tsx'>


