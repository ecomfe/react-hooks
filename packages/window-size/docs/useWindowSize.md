---
title: useWindowSize
nav:
  title: Hooks
  path: /hook
group:
  title: Window Size
  path: /window-size
order: 2
---

# useWindowSize

Retrieve current window size, both inner and outer.

```typescript
interface WindowSize {
    innerWidth: number;
    innerHeight: number;
    outerWidth: number;
    outerHeight: number;
}

function useWindowSize(): WindowSize;
```

State will update when window resizes.

<code src='./demo/useWindowSize.tsx'>
