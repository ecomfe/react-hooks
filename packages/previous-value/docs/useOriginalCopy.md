---
title: useOriginalCopy
nav:
  title: Hooks
  path: /hook
group:
  title: Previous Value
  path: /previous-value
order: 3
---

# useOriginalCopy

React is a framework heavily depends on "reference equal",
native hooks like `useCallback` and `useEffect` all requires a dependency list,
in order to use the cache inside these hooks, each item in dependency list must be reference equal.

While a reference equal is super fast in comparison, it is usually difficult to always keep an object reference equal,
we may frequently get into situations where an object is identical in content to the previous render,
but its reference changes.

This hook, `useOriginalCopy`, aimed to help retrieve the very first version of an object, that is:

```javascript
const foo = {x: 1};
originalCopy(foo); // This keeps foo in cache
originalCopy({x: 1}) === foo; // This will evaluate to true since a cached version is returned
```

This hook is significantly helpful to work aside `useCallback`, `useMemo` and `useEffect`.

```typescript
type CustomEquals<T> = (previous: T | undefined, current: T) => boolean;
function useOriginalCopy<T>(value: T, equals: CustomEquals<T> = shallowEquals): T
```

By default a shallow equal is used, a custom equality function can be passed.

<code src='./demo/useOriginalCopy.tsx'>