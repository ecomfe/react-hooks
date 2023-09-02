---
title: useSet
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Collection
  path: /collection
order: 3
---

# useSet

通过`useMethods` 将 `Set` 类型封装为方法，具体包含以下方法:

```typescript
{
    add(item: T): void;
    addAll(items: Iterable<T>): void;
    delete(item: T): void;
    deleteAll(items: Iterable<T>): void;
    clear(): void;
}
```

使用的时候像其他Hook一样即可。

```javascript
import { useSet } from '@huse/collection';

export default () => {
    const [set, methods] = useSet([1, 2, 3]);

    return (
        // .... 这里写你的逻辑
    );
};
```