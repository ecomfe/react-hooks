# action-pending

Hooks to encapsulate async function with pending states.

```shell
npm install @huse/action-pending
```

## useActionPending

By providing an async function, this hook create a wrappred version with a number indicating how many pending calls are on the fly.

```typescript
type AsyncFunction = (...args: any[]) => Promise<any>;

function useActionPending<A extends AsyncFunction>(action: A): [A, number]
```

The second value of returned tuple is the `pendingCount`, a simple `!!pendingCount` can be used to check whether there is any unfinished calls and motivates to a loading UI.

```jsx
import React from 'react';
import {Button, Spin} from 'antd';
import 'antd/dist/antd.min.css';
import {useActionPending} from '@huse/action-pending';

export default () => {
    const wait = time => new Promise(resolve => setTimeout(resolve, time));
    const [waitTime, pendingCount] = useActionPending(wait);
    return (
        <>
            <div>
                <Button onClick={() => waitTime(2000)}>Wait 2s</Button>
                <Button onClick={() => waitTime(4000)}>Wait 4s</Button>
                <Button onClick={() => waitTime(6000)}>Wait 6s</Button>
                <Button onClick={() => waitTime(8000)}>Wait 8s</Button>
            </div>
            {!!pendingCount && <div><Spin />{pendingCount} timeouts in the queue</div>}
        </>
    );
};
```
