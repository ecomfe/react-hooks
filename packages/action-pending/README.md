# @huse/action-pending

Hooks to encapsulate async function with pending states.

## useActionPending

By providing an async function, this hook create a wrappred version with a number indicating how many pending calls are on the fly.

```typescript
type AsyncFunction = (...args: any[]) => Promise<any>;

function useActionPending<A extends AsyncFunction>(action: A): [A, number]
```

The second value of returned tuple is the `pendingCount`, a simple `!!pendingCount` can be used to check whether there is any unfinished calls and motivates to a loading UI.

```jsx
import {useActionPending} from '@huse/action-pending';

const api = id => fetch(`/users/${id}`).then(r => r.json());

const App = () => {
    const [fetchUser, pendingCount] = useActionPending(api);

    // Use it to determine loading state
    if (pendingCount) {
        return <Loading />;
    }

    return (
        <>
            <Button onClick={() => fetchUser('admin')}>
                Load Admin
            </Button>
            <Button onClick={() => fetchUser('super')}>
                Load Super Admin
            </Button>
        </>
    )
};
```
