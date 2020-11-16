---
title: useLayoutTiming
nav:
  title: Hooks
  path: /hook
group:
  title: Performance
  path: /performance
order: 3
---

# useLayoutTiming

This hooks track a meaningful layout once.

```typescript
interface TimeRange {
    start: number;
    end: number;
    ellapsed: number;
}

function useLayoutTiming(callback: (timing: TimeRange) => void, meaningful?: boolean): void
```

`meaningful` is `true` by default in case the first layout will be reported,
you can dynamiclly pass it to record a more meaningful layout time.

<code src="./demo/useLayoutTiming.tsx">