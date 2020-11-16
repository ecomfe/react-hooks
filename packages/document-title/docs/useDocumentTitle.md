---
title: useDocumentTitle
nav:
  title: Hooks
  path: /hook
group:
  title: Document Title
  path: /document-title
order: 1
---

# useDocumentTitle

This hook updates `document.title` to custom value and will revert the change on component unmount.

```typescript
function useDocumentTitle(title: string): void;
```

Since it reverts `document.title` to previous value, it should be safe to have multiple components using this hook simultaneously.

<code src='./demo/useDocumentTitle.tsx'>
