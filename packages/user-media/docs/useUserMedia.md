---
title: useUserMedia
nav:
  title: Hooks
  path: /hook
group:
  title: User Media
  path: /user-media
order: 2
---

# useUserMedia

This hook tries to open a media stream via its `constraints` argument, returning a context indicating current streaming state, see [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) to understand its underlying browser capabilities.

```typescript
interface UserMediaHook {
    stream: MediaStream | null;
    recording: boolean;
    error: Error | null;
    start: () => void;
    stop: () => void;
}

function useUserMedia(
    constraints?: MediaStreamConstraints,
    onSuccess?: (stream: MediaStream) => void,
    onError?: (error: Error) => void
): UserMediaHook;
```

By default `useUserMedia` requires both video and audio channels.

**NOTE: On a browser where `getUserMedia` is not implemented, this hook returns `UserMediaHook` object with a special `error` containing `code` property of `"ERR_METHOD_NOT_IMPLEMENTED"`.**

<code src='./demo/useUserMedia.tsx'>
