---
title: useSet
nav:
  title: Hooks
  path: /hook
group:
  title: Collection
  path: /collection
order: 3
---

# useSet

Encapsulate `Set` type into methods via `useMethods`, contains methods below:

```typescript
{
    add(item: T): void;
    addAll(items: Iterable<T>): void;
    delete(item: T): void;
    deleteAll(items: Iterable<T>): void;
    clear(): void;
}
```

Works like any methods hook.

```javascript
import { useSet } from '@huse/collection';

export default () => {
    const [set, methods] = useSet([1, 2, 3]);

    return (
        // .... do something
    );
};
```