# collection

Hooks to manage and mutate collection types.

```shell
npm install @huse/collection
```

## useArray

Encapsulate arrays into methods via `useMethods`, contains methods below:

```typescript
{
    push(item: T): void;
    unshift(item: T): void;
    pop(): void;
    shift(): void;
    slice(start?: number, end?: number): T[];
    splice(index: number, deleteCount: number, ...insertions: T[]): void;
    remove(item: T): T[];
    removeAt(index: number): void;
    insertAt(index: number, item: T): void;
    concat(item: T | T[]): T[];
    replace(from: T, to: T): void;
    replaceAll(from: T, to: T): T[];
    replaceAt(index: number, item: T): void;
    filter(predicate: (item: T, index: number) => boolean): T[];
    union(array: T[]): T[];
    intersect(array: T[]): T[];
    difference(array: T[]): T[];
    reverse(): T[];
    sort(compare?: (x: T, y: T) => number): T[];
    clear(): T[];
}
```

```jsx
import React from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useArray} from '@huse/collection';

export default () => {
    const [array, methods] = useArray(() => Array.from({length: 3}, () => Math.random()));
    const itemStyle = {
        height: 30,
        backgroundColor: '#007bd2',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
    };
    const renderItem = (value, i) => (
        <div key={i} style={itemStyle}>
            #{i}: {value}
        </div>
    );
    return (
        <>
            <div>
                <Button onClick={() => methods.push(Math.random())}>Add Item</Button>
            </div>
            {array.map(renderItem)}
        </>
    );
};
```

## useSet

Encapsulate `Set` type into methods via `useMethods`, contains methods below:

```typescript
{
    add(item: T): Set<T>;
    addAll(items: Iterable<T>): Set<T>;
    delete(item: T): Set<T>;
    deleteAll(items: Iterable<T>): Set<T>;
    clear(): Set<T>;
}
```

Works like any methods hook.

```javascript
import {useSet} from '@huse/collection';

const App = () => {
    const [set, methods] = useSet([1, 2, 3]);

    return (
        // ...
    );
};
```

## useMap

Encapsulate `Map` type into methods via `useMethods`, contains methods below:

```typescript
{
    set(key: K, value: V): Map<K, V>;
    setAll(entries: Iterable<[K, V]>): Map<K, V>;
    delete(key: K): Map<K, V>;
    deleteAll(keys: Iterable<K>): Map<K, V>;
    clear(): Map<K, V>;
}
```

Works like any methods hook.

```javascript
import {useMap} from '@huse/collection';

const App = () => {
    const [map, methods] = useMap([[1, 2], [3, 4]]);

    return (
        // ...
    );
};
```
