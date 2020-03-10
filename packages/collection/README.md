# @huse/collection

Hooks to manage and mutate collection types.

## useArray

Encapsulate arrays into methods via `useMethods`, contains methods below:

```typescript
{
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

```jsx
import {useArray} from '@huse/collection';

const App = () => {
    const [array, methods] = useArray([1, 2, 3]);

    return (
        <div>
            {array.map(renderItem)}
        </div>
    );
};
```

## useSet

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

```jsx
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
    set(key: K, value: V): void;
    setAll(entries: Iterable<[K, V]>): void;
    delete(key: K): void;
    deleteAll(keys: Iterable<K>): void;
    clear(): void;
}
```

Works like any methods hook.

```jsx
import {useMap} from '@huse/collection';

const App = () => {
    const [map, methods] = useMap([[1, 2], [3, 4]]);

    return (
        // ...
    );
};
```
