---
title: immer
nav:
  title: Hooks
  path: /hook
---

# immer

**DEPRECATED: This package is depreacted in favor of [the offficial use-immer package](https://github.com/immerjs/use-immer).**

Provides reducer and state hooks bound to [immer](https://github.com/immerjs/immer) library.

```shell
npm install @huse/immer
```

## useImmerState

Like `useState` but give the ability to update state by directly mutate it.

```typescript
type ImmerStateProducer<S> = (state: S) => S | void;
type SetImmerState<S> = (next: S | ImmerStateProducer<S>) => void;
type ImmerState<S> = [S, SetImmerState<S>];
function useImmerState<S = any>(initialState: S | (() => S)): ImmerState<S>;
```

This works exactly the same as `useState` with a single difference that when a function is passed to `setState`, it can mutate state directly.

<code src='./demo/useImmerState.tsx'>

## useImmerReducer

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
