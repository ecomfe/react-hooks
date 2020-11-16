---
title: useOptimisticState
nav:
  title: Hooks
  path: /hook
group:
  title: Optimistic
  path: /optimistic
order: 3
---

# useOptimisticState

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