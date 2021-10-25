---
title: useSearchParamArray
nav:
title: Hooks
path: /hook
group:
title: Router
path: /router
order: 8
---

# useSearchParamArray
Like `useSearchParam` but get an array of params you need.

```typescript
function useSearchParamArray(keys: Array<string>): Array<string|null>
```
e.g.
```typescript
import {useSearchParamArray} from '@huse/router';

// query: /test?x=1&y=2
const test = () => {
    const [x, y, z] = useSearchParamArray(['x','y']);
    // 1 2 null
    console.log(x, y, z);
};
```