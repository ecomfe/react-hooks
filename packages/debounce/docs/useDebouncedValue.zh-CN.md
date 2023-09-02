---
title: useDebouncedValue
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Debounce
  path: /debounce
order: 3
---

# useDebouncedValue

指定一个value值, 并通过给定的时间对其进行防抖更新。

```typescript
function useDebouncedValue<T>(value: T, wait: number): T
```

除非输入的value值停止变化的时间超过`wait`的时间，否则返回的值将不会更新。

<code src="./demo/useDebouncedValue.tsx">




