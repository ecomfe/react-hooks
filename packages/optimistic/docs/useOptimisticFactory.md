---
title: useOptimisticFactory
nav:
  title: Hooks
  path: /hook
group:
  title: Optimistic
  path: /optimistic
order: 2
---

# useOptimisticFactory

This is a fundamental hook which manages a full functional optimistic state:

```typescript
type NextState<T> = (state: T) => T;

type AsyncWorkFlow<S, R = S> = () => Generator<NextState<S> | Promise<R>, void, R>;

type ReduceHint<S, R = S> = NextState<S> | [AsyncWorkFlow<S, R>, NextState<S>];

type Factory<S, P, R = S> = (payload: P) => ReduceHint<S, R>;

function useOptimisticFactory<S, P, R = S>(factory: Factory<S, P, R>, initialState: S): [S, (paylod: P) => void];
```

The `factory` parameter referes to a function receiving a `payload` object and returns either:

- A state reducer `(state: T) => T`, this reducer will be executed immediately providing current state, the returned state is going to be the next state.
- A tuple of `[asyncWorkflow, optimisticReducer]` which defines an async workflow and an optimistic reducer to take place before async operations complete.

An `asyncWorkflow` is a [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) which yields a reducer or a `Promise` instance.

Any time a state reducer is yielded, it will be executed against current state and generates the next state.

When a `Promise` is yielded, it will be awaited, the resolved value will be returned to `yield` statement.

Right after the first `Promise` is yielded, the `optimisticReducer` get executed to generate an optimistic state, inside `useOptimisticFactory` hook it will automatically rollback this optimistic state after `Promise` is settled (either fulfilled or rejected).

Note that `optimisticReducer` will be only executed on the first `Promise`, so if `asyncWorkflow` yields several `Promise`s the later ones will not take benefit from optimistic state.

The return value of `useOptimisticFactory` is the same signature of `useReducer`, the `state` represents the latest state and `dispatch` is a function to feed `payload` to `factory` argument.

This is a simple example to manage a todo list with `useOptimisticFactory`:

<!-- <code src='./demo/useOptimisticFactory.tsx'> -->

You can call `dispatch` at any time, parallelism is handled internally.