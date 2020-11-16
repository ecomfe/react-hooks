---
title: useTransitionState
nav:
  title: Hooks
  path: /hook
group:
  title: Transition State
  path: /transition-state
order: 2
---

# useTransitionState

Like `useState`, `useTransitionState` returns a `[value, setValue]` tuple, however when a new value takes effect via `setValue`, `value` will return to its default value after given duration.

This hook can be commonly used to show a temporary message.

```typescript
function useTransitionState<S>(defaultValue: S, defaultDuration?: number)
```

The `setValue` takes an extra `duration` argument to specify the time before value change back to default, it defaults to `defaultDuration` argument of `useTransitionState`.

<code src='./demo/useTransitionState.tsx'>
