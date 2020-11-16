---
title: useOnScreen
nav:
  title: Hooks
  path: /hook
group:
  title: Intersection
  path: /intersection
order: 2
---

# useOnScreen

Returns a boolean indicating whether element is currently on screen.

```typescript
type OnScreenOptions = Omit<IntersectionObserverInit, 'root'>;
function useOnScreen({rootMargin, threshold}: OnScreenOptions = {}): [EffectRef, boolean];
```

This hook only checks intersection between element and the root element (`documentElement` in browser).

**Note: `useOnScreen` requires `IntersectionObserver` to work, without `IntersectionObserver` it supposes the element is always on screen.**

<code src='./demo/useOnScreen.tsx'>