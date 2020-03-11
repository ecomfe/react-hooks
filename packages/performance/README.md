# @huse/performance

Provides hooks to track and report component performance.

## usePerformanceTiming

This hook tracks component's layout times and report it to a custom callback function.

```typescript
interface Timings {
    [flag: string]: number;
    initialRender: number;
    initialLayout: number;
}

interface TimingOptions {
    flags?: {[name: string]: boolean};
}

function usePerformanceTiming(callback: (timings: Timings) => void, options?: TimingOptions): void
```

It will always trigger `callback` on the first layout, consequent triggers depend on `flags` change,
every time when a flag is changed from `false` to `true` the `callback` will be triggered.

`callback` function receives a `Timings` object containing at least `initialRender` and `initialLayout` properties,
all flags evaluated to `true` also reflects a property in this argument.

```jsx
import {usePerformanceTiming} from '@huse/performance';

const App = () => {
    const [todos, setTodos] = useState(null);
    useEffect(
        () => {
            fetchTodos.then(setTodos);
        },
        []
    );
    usePerformanceTiming(sendToLog, {flags: {todosLoaded: !!todos}});
};
```

The above example will trigger `sendToLog` twice:

```jsx
// First layout
{
    initialRender: number,
    initialLayout: number,
}
// Todos loaded
{
    initialRender: number,
    initialLayout: number,
    todosLoaded: number,
}
```

## useLayoutTiming

This hooks tracks a meaningful layout once.

```typescript
interface TimeRange {
    start: number;
    end: number;
    ellapsed: number;
}

function useLayoutTiming(callback: (timing: TimeRange) => void, meaningful?: boolean): void
```

`meaningful` is `true` by default in case the first layout will be reported,
you can dynamiclly pass it to record a more meaningful layout time.

```jsx
import {useLayoutTiming} from '@huse/performance';

const App = () => {
    const [todos, setTodos] = useState(null);
    useEffect(
        () => {
            fetchTodos.then(setTodos);
        },
        []
    );
    useLayoutTiming(sendToLog, !!todos);
};
```
