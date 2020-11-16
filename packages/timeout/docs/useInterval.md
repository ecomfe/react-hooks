---
title: useInterval
nav:
  title: Hooks
  path: /hook
group:
  title: Timeout
  path: /timeout
order: 3
---

# useInterval

Set an interval to execute callback periodically.

```typescript
function useInterval(callback: (() => void) | undefined, time: number): void;
```

To cancel interval, pass a native `time`, `-1` is recommended.

**Note: `useInterval` does not execute `callback` on initial mount, to trigger it immediately, add an extra `useEffect`.**

<code src='./demo/useInterval.tsx'>