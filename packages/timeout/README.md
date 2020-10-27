# timeout

Hooks about timeout and interval.

```shell
npm install @huse/timeout
```

## useTimeout

Set a timeout to execute callback.

```typescript
function useTimeout(callback: (() => void) | undefined, time: number): void;
```

`callback` is not required to be reference equal.

To cancel timeout, pass a negative `time`, `-1` is recommended.

```jsx
import React, {useState} from 'react';
import {Slider} from 'antd';
import 'antd/dist/antd.min.css';
import {useTimeout, useInterval} from '@huse/timeout';

export default () => {
    const [theme, setTheme] = useState('light');
    const [delay, setDelay] = useState(2);
    console.log(delay);
    useTimeout(
        () => {
            console.log('timeout');
            setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
        },
        delay * 1000
    );
    const style = {
        height: 40,
        lineHeight: '40px',
        textAlign: 'center',
        backgroundColor: theme === 'light' ? '#fff' : '#222',
        color: theme === 'light' ? '#666' : '#f4f5f6',
    };
    return (
        <>
            <div>
                Choose a delay to switch theme:
                <Slider value={delay} onChange={setDelay} />
            </div>
            <div style={style}>
                Hello World
            </div>
        </>
    );
};
```

## useInterval

Set an interval to execute callback periodically.

```typescript
function useInterval(callback: (() => void) | undefined, time: number): void;
```

To cancel interval, pass a native `time`, `-1` is recommended.

**Note: `useInterval` does not execute `callback` on initial mount, to trigger it immediately, add an extra `useEffect`.**

```jsx
import React, {useState} from 'react';
import {Slider} from 'antd';
import 'antd/dist/antd.min.css';
import {useTimeout, useInterval} from '@huse/timeout';

export default () => {
    const [theme, setTheme] = useState('light');
    // Switch theme every 5s
    useInterval(
        () => setTheme(theme => (theme === 'light' ? 'dark' : 'light')),
        5 * 1000
    );
    const style = {
        height: 40,
        lineHeight: '40px',
        textAlign: 'center',
        backgroundColor: theme === 'light' ? '#fff' : '#222',
        color: theme === 'light' ? '#666' : '#f4f5f6',
    };
    return (
        <>
            <div style={style}>
                Hello World
            </div>
        </>
    );
};
```

## useStableInterval

Like `useInterval` but counts time ellapsed to execute `callback`, when `callback` returns a `Promise`, it's resolve time is counted.

`useStableInterval` ensures the next execution of callback is triggered after specified `delay` after `callback` is returned or resolved.
