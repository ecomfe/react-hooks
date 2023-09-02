---
title: useDocumentTitle
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Document Title
  path: /document-title
order: 1
---

# useDocumentTitle

这个hook可以将`document.title`更新为自定义值，并在组件卸载时恢复更改。

```typescript
function useDocumentTitle(title: string): void;
```

由于它会将`document.title`恢复到之前的值，所以多个组件同时使用这个hook应该是安全的。

<code src='./demo/useDocumentTitle.tsx'>
