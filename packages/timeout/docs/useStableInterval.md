---
title: useStableInterval
nav:
  title: Hooks
  path: /hook
group:
  title: Timeout
  path: /timeout
order: 4
---

# useStableInterval

Like `useInterval` but counts time ellapsed to execute `callback`, when `callback` returns a `Promise`, it's resolve time is counted.

`useStableInterval` ensures the next execution of callback is triggered after specified `delay` after `callback` is returned or resolved.