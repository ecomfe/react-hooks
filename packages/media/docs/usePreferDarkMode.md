---
title: usePreferDarkMode
nav:
  title: Hooks
  path: /hook
group:
  title: Media
  path: /media
order: 3
---

# usePreferDarkMode

A shortcut hook to determine whether current user prefers dark mode.

```typescript
function usePreferDarkMode(): boolean;
```

This hook is also responsive, that means the value will be updated if system changes color scheme or having a automatic scheme.

<code src="./demo/usePreferDarkMode.tsx">