# optimistic

Provides a set of react hooks to help manage optimistic states.

As previously stated in [redux-optimistic-thunk](https://github.com/ecomfe/redux-optimistic-thunk#why-this-middleware),
manually managing optimistic states, commits, rollbacks and transactions are not ideal model of state management.
React hooks provides powers to manage states in a more functional way, and this library aimed to build optimistic functions above hooks.

**This library requires [ES6 Generators](https://caniuse.com/#feat=es6-generators) to work.**

### useOptimisticFactory

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

```jsx
import React from 'react';
import {Input, Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useOptimisticFactory, useOptimisticState, useOptimisticTask} from '@huse/optimistic';

export default () => {
    const factory = ({type, payload}) => {
        switch (type) {
            case 'DELETE':
                return items => {
                    const index = items.findIndex(i => i.id === payload);
                    return [
                        ...items.slice(0, index),
                        {...items[index], deleted: true},
                        ...items.slice(index + 1),
                    ];
                };
            case 'CREATE':
                return [
                    function* create() {
                        // Await an async api call
                        const newTodo = yield saveTodo(payload);
                        // Insert the returned new todo to list, with pending set to false
                        yield items => [
                            ...items,
                            {...newTodo, pending: false, deleted: false},
                        ];
                    },
                    items => [
                        ...items,
                        // Insert an optimistic item with property pending set to true,
                        // this item will be removed after saveTodo resolves
                        {id: uid(), text: payload, pending: true, deleted: false},
                    ],
                ];
            default:
                return s => s;
        }
    };
    const [todos, dispatch] = useOptimisticFactory(factory, []);
    const renderTodo = ({id, text, pending, deleted}) => {
        const textStyle = {
            flex: 1,
            textDecoration: deleted ? 'line-through' : undefined,
        };
        const actionStyle = {
            color: pending ? '#d9d9d9' : '#1a90ff',
        };
        const deleteTodo = (pending || deleted) ? undefined : () => dispatch({type: 'DELETE', paylaod: id});
        return (
            <li key={id} style={{display: 'flex'}}>
                <span style={textStyle}>{t.text}</span>
                <span style={actionStyle} onClick={deleteTodo}>{pending ? 'pending' : 'delete'}</span>
            </li>
        );
    };
    return (
        <>
            <ul>
                {todos.map(renderTodo)}
            </ul>
            <Input.Search
                placeholder="What to do..."
                enterButton="Add Todo"
                onSearch={value => dispatch({type: 'CREATE', payload: value})}
            />
        </>
    );
};
```

You can call `dispatch` at any time, parallelism is handled internally.

### useOptimisticState

Like `useState` and `useReducer`, `useOptimisticState` is a simmple encapsulation to `useOptimisticFactory`.

```typescript
interface SetState<T> {
    (input: T | NextState<T>): void;
    (setAsync: Promise<T> | Promise<NextState<T>>, setSync: T | NextState<T>): void;
}

function useOptimisticState<S>(initialState: S): [S, SetState<S>];
```

The `setState` can receive 2 different arguments:

```js
setState(nextState);
setState(promise, optimisticNextState);
```

When only 1 argument is provided, this works exactly the same as `useState` hook, `nextState` can be either a state object or a state reducer `(state: T) => T`.

When 2 arguments are provided, the first one is a `Promise` which resolves to a `nextState` (which is a state object or a reducer), the second is a `nextState` takes optimistic effects.

```js
const [todos, setTodos] = useOptimisticState([]);
const addTodo = todo => setState(
    (async () => {
        const newTodo = await saveTodo(todo);
        // We recommend to use a reducer since it is asynchronous
        return todos => [...todos, {...newTodo, pending: false, deleted: false}];
    })(),
    // Optimistic next state is executed synchronously, it can be a single state object
    [...todos, {...todo, pending: true, deleted: false}]
);
```

### useOptimisticTask

This is a binding of `useOptimisticState` and an async task.

```typescript
function useOptimisticTask<S, A>(task: (arg: A) => Promise<S>, optimisticTask: (arg: A) => S, initialState: S);
```

- The `task` is an async function `(arg: TArg) => Promise<TState>`.
- The `optimisticTask` is a sync version of task provides an optimistic response `(arg: TArg) => TState`.
- Returned `run` function receives the same argument as `task`.

```js
const newTodo = async todo => {
    const newTodo = await saveTodo(todo);
    // We recommend to use a reducer since it is asynchronous
    return todos => [...todos, {...newTodo, pending: false, deleted: false}];
};
const optimisticNewTodo = todo => todos => [...todos, {...todo, pending: true, deleted: false}];
const [todos, addTodo] = useOptimisticTask(newTodo, optimisticNewTodo, []);
```

`useOptimisticTask` is useful when encapsulating business aware hooks.
