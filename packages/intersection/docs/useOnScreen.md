---
title: useOnScreen
nav:
  title: Hooks
  path: /hook
group:
  title: Intersection
  path: /intersection
order: 1
---

# intersection

Provides hooks to observe intersection between element and viewport.

```shell
npm install @huse/intersection
```

## useOnScreen

Returns a boolean indicating whether element is currently on screen.

```typescript
type OnScreenOptions = Omit<IntersectionObserverInit, 'root'>;
function useOnScreen({rootMargin, threshold}: OnScreenOptions = {}): [EffectRef, boolean];
```

This hook only checks intersection between element and the root element (`documentElement` in browser).

**Note: `useOnScreen` requires `IntersectionObserver` to work, without `IntersectionObserver` it supposes the element is always on screen.**

<code src='./demo/useOnScreen.tsx'>