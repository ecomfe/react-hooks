---
title: useMethodsExtension
nav:
  title: Hooks
  path: /hook
group:
  title: Methods
  path: /methods
order: 2
---

## useMethodsExtension

Once you have a `setState` function from `useImmer` in `@huse/immer`, you can also wrap it to a methods object.

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