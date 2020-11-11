---
title: usePerformanceTiming
nav:
  title: Hooks
  path: /hook
group:
  title: Performance
  path: /performance
order: 1
---

# performance

Provides hooks to track and report component performance.

```shell
npm install @huse/performance
```

## usePerformanceTiming

This hook tracks component's layout times and report it to a custom callback function.

```typescript
interface Timings {
    [flag: string]: number;
    initialRender: number;
    initialLayout: number;
}

interface TimingOptions {
    flags?: {[name: string]: boolean};
}

function usePerformanceTiming(callback: (timings: Timings) => void, options?: TimingOptions): void
```

It will always trigger `callback` on the first layout, consequent triggers depend on `flags` change,
every time when a flag is changed from `false` to `true` the `callback` will be triggered.

`callback` function receives a `Timings` object containing at least `initialRender` and `initialLayout` properties,
all flags evaluated to `true` also reflects a property in this argument.

<code src="./demo/usePerformanceTiming.tsx">