---
title: useActionPending
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Action Pending
  path: /action-pending
order: 2
---

# useActionPending

当你传递一个异步函数给这个hook时，它会返回一个封装后的函数和一个“异步进行中”的数量。

```typescript
type AsyncFunction = (...args: any[]) => Promise<any>;

function useActionPending<A extends AsyncFunction>(action: A): [A, number]
```

在返回的元组中，第二项称为`pendingCount`，你可以简单地用`!!pendingCount`来判断是否还有未完成的异步，并在界面上表现为一个"加载中"的视图。

<code src="./demo/useActionPending.tsx">