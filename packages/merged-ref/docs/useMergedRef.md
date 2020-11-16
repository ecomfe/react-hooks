---
title: useMergedRef
nav:
  title: Hooks
  path: /hook
group:
  title: Merged Ref
  path: /merged-ref
order: 2
---

# useMergedRef

In react, refs can be a mutation container typed `Ref<T>`, or a callback typed `CallbackRef<T>`.
In case you need to use multiple refs on a single element like, this hook helps you to merge them into a single `CallbackRef<T>`.

```typescript
type RefLike<T> = Ref<T> | null | undefined;

function useMergedRef<T>(refs: Array<RefLike<T>>): RefCallback<T>
```

In the ecosystem of react, many custom hooks return callback ref, in order to serve multiple functions on the same element,
`useMergedRef` is introduced.

<code src="./demo/useMergedRef.tsx">
