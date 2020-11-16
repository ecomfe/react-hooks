---
title: useRequest
nav:
  title: Hooks
  path: /hook
group:
  title: Request
  path: /request
order: 2
---

# useRequest

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

<code src='./demo/useRequest.tsx'>

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
- `waitAccept`: In this strategy a latest response is stored in `nextData` or `nextError`, developers are able to show a notification to user and "accept" that manually, by invoking `accept()` the latest response overwrites the previous one.

<code src='./demo/useRequest2.tsx'>

### Idempotent

The `idempotent` option indicates whether a request is indempotent, that is it should respond with the same result if given params keep identical, usually a HTTP GET request is indempotent.

When `idempotent` is set to `true`, and a previous request with the same params is pending, `useRequest` doesn't fire another request, it reuses the previous one.

### Race Condition

The term "race condition" refers to the issue where a request may receive an unrelated response because multiple requests and responses are not in series order.

`useRequest` solves race condition issue by having a map of params and response, `params` are not required to be reference equal.

### Multiple Request

The `request` function passed to `useRequest` should be reference equal if they refer to the same resource,
use a `useCallback` to ensure this if it is dynamically created inside a component.

Multiple `request` function works with `useRequest`, it stores responses of different request functions in different maps.
