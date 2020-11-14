---
title: useMethods
nav:
  title: Hooks
  path: /hook
group:
  title: Methods
  path: /methods
order: 1
---

# methods

Provides infrastructure hooks to encapsulate a state and some methods together.

```shell
npm install @huse/methods
```

## useMethods

Provides hooks to create methods around a state.

In order to work with both immer state from `@huse/immer` and native state from `useState`, we have both `useMethods` and `useMethodsNative` hooks.

All hooks receive a reducer object containing methods to mutate (or create a new) state, after wrapping into methods,
the first `state` argument is omitted, all subsequent arguments remain the same, the return values is changed to `void`.

```typescript
interface NativeReducers<S> {
    [key: string]: (state: S, ...args: any[]) => S;
}

interface ImmerReducers<S> {
    [key: string]: (state: S, ...args: any[]) => S | void;
}

type Strip<T> = T extends (state: any, ...args: infer P) => any ? (...args: P) => void : never;

type Methods<S, R extends NativeReducers<S> | ImmerReducers<S>> = {[K in keyof R]: Strip<R[K]>};
```

## useMethods

This is a fundamental hook which wraps a set of mutation methods to a state into a hook.

```typescript
export function useMethods<S, R extends Reducers<S>>(init: R | (() => R), initialState: S | (() => S)): [S, Methods<S, R>, SetImmerState<S>]
```

In short, `useMethods` returns a tuple containing 3 items: the state, an object of methods mutating the state, the `setState` function.

<code src="./demo/useMethods.tsx">

**Note: `useMethods` is a one-time setup, that means `init` argument only works in the initial call,
change it in subsequent calls takes no effect.**

To use with TypeScript requiring generic to complex type like `Array`, create a generic factory function to initialize the reducer object.

```typescript
function createArrayReducers<T>(): Reducers<T[]> {
    return {
        push(state: T[], value: T) {
            state.push(value);
        },
        splice(state: T[], index: number, count: number, ...inserts: T[]) {
            state.splice(index, count, ...inserts);
        },
        empty() {
            // Return a newstate to reset it
            return [];
        },
    };
};

function useArray<T>(initialValues: T[]) {
    return useMethods(createArrayReducers<T>(), initialValues);
}
```