# @huse/methods

This is a fundamental hook which wraps a set of mutation methods to a state into a hook.

```typescript
export interface Reducers<S> {
    [key: string]: (state: S, ...args: any[]) => S;
}

type Strip<T> = T extends (state: infer S, ...args: infer P) => any ? (...args: P) => S | void : never;

export type Methods<S, R extends Reducers<S>> = {[K in keyof R]: Strip<R[K]>};

export function useMethods<S, R extends Reducers<S>>(init: R | (() => R), initialState: S | (() => S)): [S, Methods<S, R>, SetImmerState<S>]
```

In short, `useMethods` returns a tuple containing 3 items: the state, an object of methods mutating the state, the `setState` function.

```javascript
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
