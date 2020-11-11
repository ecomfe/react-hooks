---
title: useNavigate
nav:
  title: Hooks
  path: /hook
group:
  title: Router
  path: /router
order: 1
---

# router

Enpower `react-router-dom` with hooks to interactive with location, state, search params and more.

**NOTE: This packages works only with `v5.x` and `react-router-dom` currently, `react-router-native` and `6.x` version are not supported.**

```shell
npm install @huse/router
```

## useNavigate

A implement of `react-router@6.x`'s `useNavigate` above version `5.x`.

```typescript
interface NavigateOptions<S = LocationState> {
    replace?: boolean;
    state?: S;
}

type Navigate = <S>(to: Location<S> | string, options?: NavigateOptions<S>) => void;

function useNavigate(): Navigate;
```