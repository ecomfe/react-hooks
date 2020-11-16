---
title: useCounter
nav:
  title: Hooks
  path: /hook
group:
  title: Number
  path: /number
order: 2
---

# useCounter

Manages number as a counter which can increment and decrement.

```typescript
interface CounterOptions {
    min?: number; // Min value of counter
    max?: number; // Max value of counter
    step?: number; // Step on each increment or decrement call, default to 1
}

function useCounter(initialValue: number, options?: CounterOptions): CounterMethods;
```

This is a wrap of `useMethods` in `@huse/methods` and contains methods below:

```typescript
{
    increment(): void; // plus step
    inc(): void;
    decrement(): void; // subtract step
    dec(): void;
    reset(value?: number): void; // reset to value, defaults to 0
}
```

`inc` is an alias to `increment` and `dec` is an alias to `decrement`.

<code src='./demo/useCounter.tsx'>
