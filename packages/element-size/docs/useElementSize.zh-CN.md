---
title: useElementSize
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Element Size
  path: /element-size
order: 3
---

# useElementSize

观测并返回一个元素的尺寸大小。

```typescript
export interface Size {
    width: number; // offsetWidth
    height: number; // offsetHeight
}

type ElementResizeCallback = (element: HTMLElement | null) => void;

function useElementSize(): [ElementResizeCallback, Size | undefined];
```

初始值是`undefined` 当元素改变的时候会更新尺寸大小。

<code src='./demo/useElementSize.tsx'>