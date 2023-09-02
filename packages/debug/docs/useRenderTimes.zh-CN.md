---
title: useRenderTimes
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Debug
  path: /debug
order: 2
---

# useRenderTimes

返回被触发的渲染次数。

```typescript
function useRenderTimes(): number
```

这个返回次数从`1`开始，每次重新渲染都会增加，即便props和states都没有改变。

<code src="./demo/useRenderTimes.tsx">




