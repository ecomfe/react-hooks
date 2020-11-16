---
title: useOptimisticTask
nav:
  title: Hooks
  path: /hook
group:
  title: Optimistic
  path: /optimistic
order: 4
---

# useOptimisticTask

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