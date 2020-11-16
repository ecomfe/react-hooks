---
title: useClickOutside
nav:
  title: Hooks
  path: /hook
group:
  title: Click Outside
  path: /click-outside
order: 2
---

# useClickOutside

By passing a `ref` object containing an element, `callback` will be triggered when a click happens outside that element.

```typescript
function useClickOutside(ref: RefObject<HTMLElement>, callback: (e: MouseEvent | TouchEvent) => void)
```

This hook often used in cases where a modal or a dropdown should hide when clicked outside.

It also works in a touch device, `touchstart` will be used.

<code src="./demo/useClickOutside.tsx">
