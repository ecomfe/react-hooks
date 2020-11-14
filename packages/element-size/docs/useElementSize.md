---
title: useElementSize
nav:
  title: Hooks
  path: /hook
group:
  title: Element Size
  path: /element-size
order: 2
---

## useElementSize

Observes and returns the offset size of an element.


```typescript
export interface Size {
    width: number; // offsetWidth
    height: number; // offsetHeight
}

type ElementResizeCallback = (element: HTMLElement | null) => void;

function useElementSize(): [ElementResizeCallback, Size | undefined];
```

The initial size is `undefined` and will be updated on mount anytime element is resized.

<code src='./demo/useElementSize.tsx'>