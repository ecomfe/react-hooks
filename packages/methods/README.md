# methods

Provides infrastructure hooks to encapsulate a state and some methods together.

```shell
npm install @huse/methods
```

## useMethods

Provides hooks to create methods around a state.

In order to work with both immer state from `@huse/immer` and native state from `useState`, we have both `useMethods` and `useMethodsNative` hooks.

All hooks receives a reducers object containing methods to mutate (or create a new) state, after wrapping into methods,
the first `state` argument is omitted, all subsequent arguments remains the same, the return values is changed to `void`.

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

```jsx
import React, {useState} from 'react';
import {Button, Switch} from 'antd';
import 'antd/dist/antd.min.css';
import {useMethods, useMethodsExtension} from '@huse/methods';

export default () => {
    const userMethods = {
        asAdmin(user) {
            user.role = 'admin';
            user.history.push('change to admin');
        },
        asUser(user) {
            user.role = 'uesr';
            user.history.push('change to user');
        },
        enable(user) {
            user.enabled = true;
            user.history.push('disabled');
        },
        disable(user) {
            user.enabled = false;
            user.history.push('enabled');
        },
    };
    const [user, methods] = useMethods(
        userMethods,
        {role: 'user', enabled: true, history: []}
    );
    return (
        <>
            <div>
                Admin: <Switch checked={user.role === 'admin'} onChange={user.role === 'admin' ? methods.asUser : methods.asAdmin} />
            </div>
            <div>
                Enabled: <Switch checked={user.enabled} onChange={user.enabled ? methods.disable : methods.enable} />
            </div>
            <h3>Mutation history:</h3>
            <ul>
                {user.history.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
        </>
    );
};
```

**Note: `useMethods` is a one-time setup, that means `init` argument only works in the initial call,
change it in subsequent calls take no effect.**

To use with TypeScript requiring generic to complex type like `Array`, create a generic factory function to initialize the reducers object.

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

## useMethodsExtension

Once you already have a `setState` function from `useImmer` in `@huse/immer`, you can also wrap it to a methods object.

```typescript
export function useMethodsExtension<S, R extends ImmerReducers<S>>(reducers: R, setState: SetImmerState<S>): Methods<S, R>
```

This hook is also useful to extends more methods from an already generated methods hook.

```javascript
const App = () => {
    // Suppose useArray is a hook implemented on useMethods
    const [list, methods, setList] = useArray();
    const extendedMethods = useMethodsExtension(
        {
            filterEnabled(state) {
                return state.filter(u => u.enabled);
            },
        },
        setList
    );

    // Now filterEnabled becomes a method to update list
    return (
        <>
            {/* other content */}
            <Button onClick={extendedMethods.filterEnable}>
                Only Enabeld Members
            </Button>
        </>
    );
};
```

## useMethodsNative

Like `useMethods` but works without immer support, this is used to wrap state of type which immer cannot handle, such like `Map`, `Set` and custom classes.

As a result of the absence of immer, reducers does not allow in-place mutation to states, it must return a new state object.

## useMethodsExtensionNative

Like `useMethodsExtension` but for native `useState` function.
