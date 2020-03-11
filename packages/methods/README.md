# @huse/methods

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
const arrayReducers = {
    push(state, value) {
        // Immer is introduced by default
        state.push(value);
    },
    // Works with any numbers of parameters
    splice(state, index, count, ...inserts) {
        state.splice(index, count, ...inserts);
    },
    empty() {
        // Return a new state to reset it
        return [];
    },
};

const App = () => {
    // The methods object contains properties exactly the same as given argument
    const [list, {push, splice, empty}, setList] = useMethods(arrayReducers, []);

    return (
        <>
            <ul>
                {list.map(item => <li key={item.id}>{item.name}</li> />)}
            </ul>
            <footer>
                {/* Every method is callable without the first state argument */}
                <Button onClick={() => push({id: list.length, name: 'empty'})}>Create</Button>
            </footer>
        </>
    );
}
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

```jsx
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
