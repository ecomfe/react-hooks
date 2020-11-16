---
title: useMap
nav:
  title: Hooks
  path: /hook
group:
  title: Collection
  path: /collection
order: 4
---

# useMap

Encapsulate `Map` type into methods via `useMethods`, contains methods below:

```typescript
{
    set(key: K, value: V): void;
    setAll(entries: Iterable<[K, V]>): void;
    delete(key: K): void;
    deleteAll(keys: Iterable<K>): void;
    clear(): void;
}
```

Works like any methods hook.

```javascript
import { useMap } from '@huse/collection';

export default () => {
    const [map, methods] = useMap([[1, 2], [3, 4]]);

    return (
        // .... do something
    );
};
```