# request

Tries to provide basic capabilities to make a request inside react components.

By "request" we mean any asynchronous mapping from a input to an output, typically a HTTP fetch.

```shell
npm install @huse/request
```

## useRequest

`useRequest` receives a request function and a param of any type, returns an context obejct containing information about the pending state, response data and errors.

```typescript
type ResponseStrategy = 'acceptLatest' | 'keepEarliest' | 'keepEarliestSuccess' | 'waitAccept';
type Request<K, O> = (key: K) => Promise<O>;
interface RequestOptions {
    strategy?: ResponseStrategy;
    idempotent?: boolean;
}
interface RequestResult<O = void, E = Error> {
    pending: boolean; // Whether request is pending, a shortcut of "pendingCount > 0"
    pendingCount?: number; // Number of pending request
    data?: O; // Response data if succeeds
    error?: E; // Reponse error if fails
    nextData?: O; // Next response data waiting for manual accept
    nextError?: E; // Next response error waiting for manual accept
    accept(): void; // Accept next data or error
}
function useRequest<K, O, E>(task: Request<K, O>, params: K, options?: RequestOptions): RequestResult<O, E>;
```

Comparing to various request hooks in community, `useRequest` tries to keep itself simple and managed to solve some essential issues related to asynchronous processes.

```jsx
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Spin, Button, Slider, notification} from 'antd';
import 'antd/dist/antd.min.css';
import {useRequest} from '@huse/request';

export default () => {
    const [base, setBase] = useState(0);
    const generateRandom = useCallback(
        // Delay for 1.5s and resolve with a random value
        ({base}) => new Promise(resolve => setTimeout(() => resolve(base + Math.random()), 1500)),
        []
    );
    const result = useRequest(generateRandom, {base});
    return (
        <>
            <div>
                Base Value: <Slider value={base} min={0} max={9} onChange={setBase} />
            </div>
            <div>
                {result.pending ? <Spin /> : <span>Generated Value: {result.data}</span>}
            </div>
        </>
    );
};
```

### Conditional Request

Once you want `request` to fire only in certain condition, e.g. to fetch data only when selected ids are not empty, it is recommended to create a new function which only calls the original task in that condition.

```javascript
import {findByIds} from './api';

const findByIdsOnSelect = params => {
    // Fetch only when params.ids are not empty
    if (params.ids.length) {
        return findByIds(params);
    }

    // In other circumstance, resolve immediately to an empty array
    return Promise.resolve([]);
};

const DetailList = ({ids}) => {
    const {pending, users} = useRequest(findByIdsOnSelect, {ids});

    return pending ?
        <Loading />
        : (
            <ul>
                {users.map(renderUser)}
            </ul>
        );
};
```

### Strategy

When a second response arrives, it interacts with the previous response with the same params according to specified strategy.
We provided 4 built-in strategies to store responses:

- `acceptLatest`: The latest response always overwrites the previous one, this is the most common case, and is the default value of `strategy` option.
- `keepEarliest`: Store the first response, all subsequent responses are discarded.
- `keepEarliestSuccess`: Keep the earliest success response, discard subsequent ones, this is widely used where response is supposed to be stable, such as fetching an aggregated summary of a previous date.
- `waitAccept`: In this strategy a latest response is stored in `nextData` or `nextError`, developers are able to show a notification to user and "accept" that manually, by invoking `accept()` the latested response overwrites the previous one.

```jsx
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Spin, Button, Slider, notification} from 'antd';
import 'antd/dist/antd.min.css';
import {useRequest} from '@huse/request';

export default () => {
    const generateRandom = useCallback(
        // Delay for 1.5s and resolve with a random value
        () => new Promise(resolve => setTimeout(() => resolve(Math.random()), 1500)),
        []
    );
    // Simuate situation that will request with a limited set of params
    const [base, setBase] = useState(0);
    const result = useRequest(generateRandom, {base}, {strategy: 'waitAccept'});
    // Refetch every 3s, since we have 2 base values, a notification should shown each 6s
    useEffect(
        () => {
            const tick = setTimeout(
                () => setBase(v => (v + 1) % 2),
                3 * 1000
            );
            return () => clearTimeout(tick);
        },
        [base]
    );
    // Notify for accept
    useEffect(
        () => {
            if (!result.nextData) {
                return;
            }
            const acceptAndClose = () => {
                notification.close('new-value');
                result.accept();
            };
            const options = {
                key: 'new-value',
                message: 'New Data Arrives',
                description: 'There is new data arrived, click confirm to refresh',
                btn: (
                    <Button type="primary" size="small" onClick={acceptAndClose}>
                        Confirm
                    </Button>
                ),
            };
            notification.open(options);
        },
        [result.nextData, base]
    );
    console.log(result);
    return result.data ? <div>{result.data}</div> : <Spin />;
};
```

### Idempotent

The `idempotent` option indicates whether a request is indempotent, that is it should respond with the same result if given params keep identical, usually a HTTP GET request is indempotent.

When `idempotent` is set to `true`, and a previous request with the same params is pending, `useRequest` doesn't fire another request, it reuses the previous one.

### Race Condition

The term "race condition" refers to the issue where a request may receive an unrelated response because multiple requests and responses are not in series oreder.

`useRequest` solves race condition issue by having a map of params and response, `params` are not required to be reference equal.

### Multiple Request

The `request` function passed to `useRequest` should be reference equals if they refer to the same resource,
use a `useCallback` to ensure this if it is dynamically created inside a component.

Multiple `request` function works with `useRequest`, it stores responses of different request functions in different maps.

## useRequestCallback

Like `useReqeust` but instead of trigger request automatically this hook returns a function (`() => void`) to allow manual trigger of request.

```typescript
function useRequestCallback<K, O, E>(task: Request<K, O>, params: K, options?: RequestOptions): [() => void, RequestResult<O, E>]
```

This allows to attach request with user interaction like button clicks.

```javascript
import {Spin} from 'antd';
import {noop} from 'lodash';
import {useRequestCallback} from '@huse/request';

const api = id => fetch(`/users/${id}`).then(r => r.json());

const App = ({user}) => {
    const [request, result] = useRequestCallback(api, {id: user.id});

    if (result.pending || !result.data) {
        return (
            <a onClick={result.pending ? noop : request}>
                show detail
                {!!result.pending && <Spin />}
            </a>
        );
    }

    return (
        <div>
            username: {result.data.username}
        </div>
    );
};
```
