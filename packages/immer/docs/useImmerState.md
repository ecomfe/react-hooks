---
title: useImmerState
nav:
  title: Hooks
  path: /hook
group:
  title: Immer
  path: /immer
order: 2
---

# useImmerState

Like `useState` but give the ability to update state by directly mutate it.

```typescript
type ImmerStateProducer<S> = (state: S) => S | void;
type SetImmerState<S> = (next: S | ImmerStateProducer<S>) => void;
type ImmerState<S> = [S, SetImmerState<S>];
function useImmerState<S = any>(initialState: S | (() => S)): ImmerState<S>;
```

This works exactly the same as `useState` with a single difference that when a function is passed to `setState`, it can mutate state directly.

<code src='./demo/useImmerState.tsx'>


