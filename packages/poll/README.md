# poll

Poll data periodically and update corresponding state.

```shell
npm install @huse/poll
```

## usePoll

Provides the ability to periodically request data, store it in a state.

```typescript
interface PollOptions {
    minInterval: number; // Minimum interval
    maxInterval?: number; // Maximum interval
    maxIdleTime?: number; // How long to wait before user is inactive without any action
    stopOnInactive?: boolean; // Stop poll when use is inactive
}
type PollHook<S> = [S | undefined, number];
function usePoll<S>(fetch: () => Promise<S>, options: number | PollOptions): PollHook<S>
```

The second number of returned tuple is `pendingCount` indicating how many requests are currently on the fly.

Without `options` argument, poll is triggered at a stable interval, time ellapsed between request and response are excluded from interval, the next request is started after `interval` milliseconds when response is arrived.

```jsx
import React, {useCallback} from 'react';
import {Spin} from 'antd';
import 'antd/dist/antd.min.css';
import {usePoll} from '@huse/poll';

export default () => {
    const generateRandom = useCallback(
        // Delay for 1.5s and resolve with a random value
        () => new Promise(resolve => setTimeout(() => resolve(Math.random()), 1500)),
        []
    );
    // Polls every 10s
    const [value, pendingCount] = usePoll(generateRandom, 10 * 1000);
    return (
        <div>
            {value}
            {!!pendingCount && <Spin />}
        </div>
    );
};
```

By passing `options` argument with both `minInterval` and `maxInterval`, `usePoll` works in an "intelligent mode".

In this mode, poll interval varies between `minInterval` and `maxInterval` corresponding to whether use is active or not.

User active states are described as one of the three:

- Active: user is actively interacting with current view, poll will be triggered at an interval of `minInterval`.
- Unknown: user takes no activity for a while (specified by `maxIdleTime`, defaults to 30 seconds), poll will have an interval greater than `minInterval` but less than `maxInterval`.
- Inactive: user is completely inactive, e.g. document is hidden or window losts focus, poll will be stopped if `stopOnInactive` is `ture`, or will behave like when user is in unknown state.

```jsx
import React, {useCallback} from 'react';
import {Spin} from 'antd';
import 'antd/dist/antd.min.css';
import {usePoll} from '@huse/poll';

export default () => {
    const generateRandom = useCallback(
        // Delay for 1.5s and resolve with a random value
        () => new Promise(resolve => setTimeout(() => resolve(Math.random()), 1500)),
        []
    );
    const options = {
        minInterval: 5 * 1000,
        maxInterval: 20 * 1000,
        maxIdleTime: 30 * 1000,
        stopOnInactive: true,
    };
    const [value, pendingCount] = usePoll(generateRandom, options);
    return (
        <>
            <div>
                {value}
                {!!pendingCount && <Spin />}
            </div>
            <p>Poll will slow down when you keep inactive for 30s.</p>
            <p>Poll will stop when you switch to another app.</p>
        </>
    );
};
```
