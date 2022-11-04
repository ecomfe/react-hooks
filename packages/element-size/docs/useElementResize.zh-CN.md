---
title: useElementResize
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Element Size
  path: /element-size
order: 2
---

# useElementResize

当元素调整大小时会触发一个回调函数。

```typescript
type ElementResizeCallback = (element: HTMLElement | null) => void;

function useElementResize(callback: (element: HTMLElement) => void): ElementResizeCallback;
```

为了确保所有改变的元素都能被捕获，甚至元素类型改变(从`<div>`标签修改为`<span>`标签),
`useElementResize` 返回一个callback ref, 你需要把这个`ref` 值通过prop的形式传递给DOM元素。

**注意: `useElementResize` 不会在初始mount阶段触发callback回调。**

<code src='./demo/useElementResize.tsx'>
