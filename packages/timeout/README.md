---
title: timeout
nav:
  title: Hooks
  path: /hook
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

## useInterval

Set an interval to execute callback periodically.

```typescript
function useInterval(callback: (() => void) | undefined, time: number): void;
```

To cancel interval, pass a native `time`, `-1` is recommended.

**Note: `useInterval` does not execute `callback` on initial mount, to trigger it immediately, add an extra `useEffect`.**

<code src='./demo/useInterval.tsx'>

## useStableInterval

Like `useInterval` but counts time ellapsed to execute `callback`, when `callback` returns a `Promise`, it's resolve time is counted.

`useStableInterval` ensures the next execution of callback is triggered after specified `delay` after `callback` is returned or resolved.
