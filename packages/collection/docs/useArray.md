---
title: useArray
nav:
  title: Hooks
  path: /hook
group:
  title: Collection
  path: /collection
order: 2
---

# useArray

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

<code src="./demo/useArray.tsx">





