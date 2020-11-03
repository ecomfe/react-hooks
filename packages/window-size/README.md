---
title: window-size
nav:
  title: Hooks
  path: /hook
---

# window-size

Read and observe the size of viewport.

```shell
npm install @huse/window-size
```

## useWindowSize

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
