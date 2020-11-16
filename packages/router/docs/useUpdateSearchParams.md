---
title: useUpdateSearchParams
nav:
  title: Hooks
  path: /hook
group:
  title: Router
  path: /router
order: 7
---

# useUpdateSearchParams

Get a function to update search params via any object.

```typescript
interface SearchParamsPatch {
    [key: string]: string | number | string[] | number[] | undefined | null;
}

type UpdateSearchParams = <S>(patch: SearchParamsPatch, options?: NavigateOptions<S>) => void;

function useUpdateSearchParams(): UpdateSearchParams;
```

`URLSearchParams#toString` is used to stringify search params to search string.