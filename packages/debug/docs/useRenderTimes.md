---
title: useRenderTimes
nav:
  title: Hooks
  path: /hook
group:
  title: Debug
  path: /debug
order: 2
---

# useRenderTimes

Returns the times of render triggered.

```typescript
function useRenderTimes(): number
```

This returned times starts from `1` and increase on each render, even props and states are not changed.

<code src="./demo/useRenderTimes.tsx">




