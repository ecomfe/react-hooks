---
title: useRequestCallback
nav:
  title: Hooks
  path: /hook
group:
  title: Request
  path: /request
order: 3
---

# useRequestCallback

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