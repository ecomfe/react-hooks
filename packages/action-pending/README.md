# @huse/action-pending

包装异步函数，控制函数调用中数量。

```javascript
import {useActionPending} from '@huse/action-pending';

const api = id => fetch(`/users/${id}`).then(r => r.json());
const [fetchUser, pendingCount] = useActionPending(api);
const pendingX = fetchUser('admin'); // pendingCount becomes 1
const pendingY = fetchUser('super'); // pendingCount becomes 2
const admin = await pendingX; // pendingCount becomes 1
const super = await pendingY; // pendingCount becomes 0

// Use it to determine loading state
if (!pendingCount) {
    return <Loading />;
}
```
