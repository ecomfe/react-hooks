---
title: useElementResize
nav:
  title: Hooks
  path: /hook
group:
  title: Element Size
  path: /element-size
order: 2
---

# useElementResize

Trigger a callback when element resizes.

```typescript
type ElementResizeCallback = (element: HTMLElement | null) => void;

function useElementResize(callback: (element: HTMLElement) => void): ElementResizeCallback;
```

To ensure all element changed are captured even with the change of element type (like from `<div>` to `<span>`),
`useElementResize` returns a callback ref, you are required to pass it via `ref` prop to an DOM element.

**Note: `useElementResize` does not trigger callback on initial mount.**

<code src='./demo/useElementResize.tsx'>
