---
title: useNavigate
nav:
  title: Hooks
  path: /hook
group:
  title: Router
  path: /router
order: 2
---

# useNavigate

A implement of `react-router@6.x`'s `useNavigate` above version `5.x`.

```typescript
interface NavigateOptions<S = LocationState> {
    replace?: boolean;
    state?: S;
}

type Navigate = <S>(to: Location<S> | string, options?: NavigateOptions<S>) => void;

function useNavigate(): Navigate;
```