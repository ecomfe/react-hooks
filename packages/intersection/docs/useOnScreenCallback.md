---
title: useOnScreenCallback
nav:
  title: Hooks
  path: /hook
group:
  title: Intersection
  path: /intersection
order: 4
---

# useOnScreenCallback

This is a fundamental hook which triggers a callback when element intersects with screen.

```typescript
type OnScreenOptions = Omit<IntersectionObserverInit, 'root'>;
function useOnScreenCallback(callback: (entry: IntersectionObserverEntry) => void, options?: OnScreenOptions): EffectRef;
```

`callback` is triggered whenever element is into or out of screen.

Most of the time `useOnScreen` and `useOnScreenValue` are enough, those hooks leave the ability to extend custom logics with screen intersection.