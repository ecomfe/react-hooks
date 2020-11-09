---
title: useTimeout
nav:
  title: Hooks
  path: /hook
group:
  title: Timeout
  path: /timeout
order: 1
---

# timeout

Hooks about timeout and interval.

```shell
npm install @huse/timeout
```

## useTimeout

Set a timeout to execute callback.

```typescript
function useTimeout(callback: (() => void) | undefined, time: number): void;
```

`callback` is not required to be reference equal.

To cancel timeout, pass a negative `time`, `-1` is recommended.

<code src='./demo/useTimeout.tsx'>
