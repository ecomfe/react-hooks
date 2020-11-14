---
title: useDebouncedCallback
nav:
  title: Hooks
  path: /hook
group:
  title: Debounce
  path: /debounce
order: 3
---

## useDebouncedCallback

Simply wrap a callback to a debounced one.

```typescript
function useDebouncedCallback<C extends Function>(callback: C, wait: number): C
```

Note all queued invocation will be canceled when component unmounts and when either `callback` or `wait` is changed.

```javascript
import {useState} from 'react';
import {useDebouncedCallback} from '@huse/debounce';

const [list, setList] = useState([]);

// invokes after 200ms wait
const search = useDebouncedCallback(
    async e => {
        const items = await findByKeyword(e.target.value);
        setList(items);
    },
    200
);
```