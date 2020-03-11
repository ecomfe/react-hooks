# @huse/debug

A set of hooks for debugging component.

## useRenderTimes

Returns the times of render triggered.

```typescript
function useRenderTimes(): number
```

This times returned starts from `1` and increase on each render, even props and states are not changed.

```jsx
import {useRenderTimes} from '@huse/debug';

const App = () => {
    const renderTimes = useRenderTimes();

    console.log(renderTimes);

    return (
        // ...
    );
};
```

## useChangeTimes

Like `useRenderTimes` but only increment when a value is actually changed.

```typescript
function useChangeTimes<T>(value: T): number
```

This hooks identifies "change" by reference, to inspect why a value is changed, try `useUpdateCause` hook.

```jsx
import {useChangeTimes} from '@huse/debug';

const App = props => {
    const renderTimes = useChangeTimes(props.foo);

    console.log(renderTimes);

    return (
        // ...
    );
};
```

## useUpdateCause

Returns an array of reasons causing component to update.

```typescript
function useUpdateCause<T extends {}>(props: T, print: boolean = true): UpdateCause[]
```

Each object in array has a structure detailed below:

```typescript
export interface UpdateCause {
    propName: string; // Changed property name
    shallowEquals: boolean; // Whether previous and current value are shallow equal
    deepEquals: boolean; // Whether previous and current value are deep equal
}
```

This hook can help to detect unexpected component update caused by "content equal but reference different" props, [useOriginalCopy from @huse/previous-value](https://github.com/ecomfe/react-hooks/tree/master/packages/previous-value#useoriginalcopy) can further help to elliminate these unwanted updates.

By default this hook will print update causes in conse like:

```text
-----------------------------------------------------------------------
| (index) | previousValue | currentValue | shallowEquals | deepEquals |
-----------------------------------------------------------------------
|   foo   |    [Object]   |   [Object]   |     true      |    true    |
|   bar   |      1234     |     5678     |     true      |    true    |
-----------------------------------------------------------------------
```

Passing the second argument as `false` can stop it from print in console.

```jsx
import {useUpdateCause} from '@huse/debug';

const App = props => {
    const [message, setMessage] = useState('');
    // Compare all props, print in console
    useUpdateCause(props);
    // Compare only some props or custom value, do not print in console
    const causes = useUpdateCause({message, foo: props.foo, bar: props.bar});
    console.log(causes);

    return (
        // ...
    );
}
```
