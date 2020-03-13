# @huse/previous-value

Provides hooks about retrieving and comparing current value with the previous version.

## usePreviousValue

Prevoius value if sometimes useful in react development, like to derive a state,
or to determine transition duration on how value is changed.

This hook returns the previous value of given argument.

```typescript
function usePreviousValue<T>(value: T): T | undefined
```

**Note: this hook is not designed to get the "previous different version", the previous value may be the same of given value.**

```jsx
import {useReducer} from 'react';
import {Button} from 'antd';
import {usePreviousValue} from '@huse/previous-value';

const App = () => {
    const [value, increment] = useReducer(v => v + 1, 0);
    const previousValue = usePreviousValue(value);

    return (
        <div>
            {previousValue === undefined ? value : `${previousValue} -> ${value}`}
            <Button onClick={increment}>+1</Button>
        </div>
    );
};
```

## useOriginalCopy

React is a framework heavily depends on "reference equal",
native hooks like `useCallback` and `useEffect` all requires a dependency list,
in order to use the cache inside these hooks, each item in dependency list must be reference equals.

While a reference equal is super fast in comparison, it is usually difficult to always keep an object reference equal,
we may frequently get into situations where an object is identical in content to the previous render,
but its reference changes.

This hook, `useOriginalCopy`, aimed to help retrieve the very first version of an object, that is:

```jsx
const foo = {x: 1};
originalCopy(foo); // This keeps foo in cache
originalCopy({x: 1}) === foo; // This will evaluate to true since a cached version is returned
```

This hooks is significantly helpful to work aside `useCallback`, `useMemo` and `useEffect`.

```typescript
type CustomEquals<T> = (previous: T | undefined, current: T) => boolean;
function useOriginalCopy<T>(value: T, equals: CustomEquals<T> = shallowEquals): T
```

By default a shallow equal is used, a custom equality function can be passed.

```jsx
import {useOriginalCopy} from '@huse/previous-value';

const App = () => {
    const [effectsCount, runEffect] = useReducer(v => v + 1, 0);
    const forceUpdate = useReducer(v => v + 1, 0)[1];
    const value = {x: 1}; // This is not memoized
    const originalValue = useOriginalCopy(value); // The original copy of value if retrieved on each render
    // originalValue will be reference equal on different render, effect runs only once
    useEffect(
        () => {
            runEffect();
        },
        [originalValue]
    );

    return (
        <div>
            Effect run {effectsCount} times.
            <Button onClick={forceUpdate}>Force Update</Button>
        </div>
    );
};
```

## useOriginalDeepCopy

This is a short cut version of `useOriginalCopy` using a deep equality function.

```typescript
type CustomEquals<T> = (previous: T | undefined, current: T) => boolean;
function useOriginalDeepCopy<T>(value: T): T;
```

In short, this is exactly the same as:

```jsx
return useOriginalCopy(value, deepEquals)
```

## usePreviousEquals

Determine whether value is changed in current render.

```typescript
type CustomEquals<T> = (previous: T | undefined, current: T) => boolean
function usePreviousEquals<T>(value: T, equals?: CustomEquals<T>): boolean;
```

By default a shallow compare is performed to check equality, a custom equality function can be provided.
