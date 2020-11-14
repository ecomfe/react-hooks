---
title: useHover
nav:
  title: Hooks
  path: /hook
group:
  title: Hover
  path: /hover
order: 1
---

# hover

Provides a hook to observe whether element is in hover state.

```shell
npm install @huse/hover
```

## useHover

This hook returns a set of props to handle mouse events in order to report whether element is currently in hover state.

```typescript
interface HoverOptions {
    delay?: number;
}

interface HoverCallbacks {
    onMouseEnter(event: MouseEvent): void;
    onMouseLeave(event: MouseEvent): void;
}

function useHover(options: HoverOptions = {}): [boolean, HoverCallbacks]
```

The `delay` option is default to `0`, with a value less than or equals to 0 hover state will change immediately on mouse enter and leave.

<code src='./demo/useHover.tsx'>

Note that when `delay` is a positive value, `onEnter` and `onLeave` callbacks are also debounced,
once you want these callbacks to execute immediately without debouncing, compose callbacks yourself:

<code src='./demo/useHover2.tsx'>
