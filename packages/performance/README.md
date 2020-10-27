# performance

Provides hooks to track and report component performance.

```shell
npm install @huse/performance
```

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
import React, {useState, useReducer} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {usePerformanceTiming, useLayoutTiming} from '@huse/performance';

export default () => {
    // Don't do this in production!
    const [timing, setTiming] = useState({});
    const [userClicked, setClicked] = useReducer(() => true, false);
    usePerformanceTiming(
        setTiming,
        {flags: {userClicked}}
    );
    console.log(timing);
    return (
        <>
            <div>
                <Button onClick={setClicked}>Click to update timing</Button>
            </div>
            <p>
                initialRender: {timing.initialRender || 'N/A'}
            </p>
            <p>
                initialLayout: {timing.initialLayout || 'N/A'}
            </p>
            <p>
                userClicked: {timing.userClicked || 'N/A'}
            </p>
        </>
    );
};
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
import React, {useState, useReducer} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {usePerformanceTiming, useLayoutTiming} from '@huse/performance';

export default () => {
    const [timing, setTiming] = useState();
    const [userClicked, setClicked] = useReducer(() => true, false);
    useLayoutTiming(setTiming, userClicked);
    return (
        <>
            <div>
                <Button onClick={setClicked}>Won't be meaningful until you click here</Button>
            </div>
            {timing && <p>{timing.end} (end) - {timing.start} (start) = {timing.ellapsed} (ellapsed)</p>}
        </>
    );
};
```
