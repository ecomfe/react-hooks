# @huse/immer

Provides reducer and state hooks bound to [immer](https://github.com/immerjs/immer) library.

## useImmerState

Like `useState` but give the ability to update state by directly mutate it.

```typescript
type ImmerStateProducer<S> = (state: S) => S | void;
type SetImmerState<S> = (next: S | ImmerStateProducer<S>) => void;
type ImmerState<S> = [S, SetImmerState<S>];
function useImmerState<S = any>(initialState: S | (() => S)): ImmerState<S>;
```

This works exactly the same as `useState` with a single difference that when a function is passed to `setState`, it can mutate state directly.

```jsx
import {useImmerState} from '@huse/immer';
import {Button} from 'antd';

const App = () => {
    const [state, setState] = useImmerState({value: 1});

    return (
        <>
            <p>Current Value: {state.value}</p>
            <div>
                {/* mutate state */}
                <Button onClick={() => setState(s => s.value++)}>Increment</Button>
                {/* return a new state */}
                <Button onClick={() => setState(s => ({value: s.value - 1})}>Decrement</Button>
                {/* set to a new state */}
                <Button onClick={() => setState({value: 0})}>Reset</Button>
            </div>
        </>
    );
};
```

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

```jsx
import {useImmerReducer} from '@huse/immer';

const App = () => {
    const [value, dispatch] = useImmerReducer(
        (state, action) => {
            switch (action.type) {
                case 'inc':
                    state.value++;
                    break;
                case 'dec':
                    state.value--;
                    break;
                case 'reset':
                    return {value: 0};
                default:
                    return state;
            }
        },
        {value: 0}
    );

    return (
        <>
            <p>Current Value: {state.value}</p>
            <div>
                <Button onClick={() => dispatch({type: 'inc'})}>Increment</Button>
                <Button onClick={() => dispatch({type: 'dec'})}>Decrement</Button>
                <Button onClick={() => dispatch({type: 'reset'})}>Reset</Button>
            </div>
        </>
    );
};
```
