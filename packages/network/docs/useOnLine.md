---
title: useOnLine
nav:
  title: Hooks
  path: /hook
group:
  title: Network
  path: /network
order: 2
---

# useOnLine

`useOnLine` returns a boolean indicates whether client is currently online.

In case where client doesn't support `online` and `offline` events, this hook always returns `true`.

<code src='./demo/useOnLine.tsx'>
