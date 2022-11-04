---
title: useDebouncedEffect
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Debounce
  path: /debounce
order: 2
---

# useDebouncedEffect

当value值在一定时间内发生改变会运行callback函数, 如果在当前时间内value值再次发生改变, 该effect会被取消。

```typescript
function useDebouncedEffect<T>(callback: () => void | (() => void), value: T, wait: number): void
```

不像 `useEffect`, `useDebouncedEffect` 只接受一个依赖项。

而且 `callback` 会返回一个清理函数, 这个清理函数**会立即执行，当value值改变的时候，没有延时**。

<code src="./demo/useDebouncedEffect.tsx">