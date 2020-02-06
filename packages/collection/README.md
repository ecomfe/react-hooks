# @huse/collection

集合相关的hook。

## useArray

对数组进行封装。

```javascript
import {useArray} from '@huse/collection';

const [array, methods] = useArray([1, 2, 3]);

return (
    <div>
        {array.map(renderItem)}
    </div>
);
```

`methods`包含以下函数：

```typescript
interface ArrayMethods<T> {
    push(item: T): void;
    unshift(item: T): void;
    pop(): void;
    shift(): void;
    slice(start?: number, end?: number): void;
    splice(index: number, deleteCount: number, ...insertions: T[]): void;
    remove(item: T): void;
    removeAt(index: number): void;
    insertAt(index: number, item: T): void;
    concat(item: T | T[]): void;
    replace(from: T, to: T): void;
    replaceAll(from: T, to: T): void;
    replaceAt(index: number, item: T): void;
    filter(predicate: (item: T, index: number) => boolean): void;
    union(array: T[]): void;
    intersect(array: T[]): void;
    difference(array: T[]): void;
    reverse(): void;
    sort(compare?: (x: T, y: T) => number): void;
    clear(): void;
}
```

## useSet

封装`Set`数据结构。

```javascript
import {useSet} from '@huse/collection';

const [set, methods] = useSet([1, 2, 3]);
```

`methods`包含以下函数：

```typescript
interface SetMethods<T> {
    add(item: T): void;
    addAll(items: Iterable<T>): void;
    delete(item: T): void;
    deleteAll(items: Iterable<T>): void;
    clear(): void;
}
```

## useMap

封装`Map`数据结构。

```javascript
import {useMap} from '@huse/collection';

const [map, methods] = useMap([[1, 2], [3, 4]]);
```

`methods`包含以下函数：

```typescript
interface MapMethods<K, V> {
    set(key: K, value: V): void;
    setAll(entries: Iterable<[K, V]>): void;
    delete(key: K): void;
    deleteAll(keys: Iterable<K>): void;
    clear(): void;
}
```
