---
title: useMap
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Collection
  path: /collection
order: 4
---

# useMap

通过`useMethods` 将 `Map` 类型封装为方法，具体包含以下方法:

```typescript
{
    set(key: K, value: V): void;
    setAll(entries: Iterable<[K, V]>): void;
    delete(key: K): void;
    deleteAll(keys: Iterable<K>): void;
    clear(): void;
}
```

使用的时候像其他Hook一样即可。

```javascript
import { useMap } from '@huse/collection';

export default () => {
    const [map, methods] = useMap([[1, 2], [3, 4]]);

    return (
        // .... 这里写你的逻辑
    );
};
```