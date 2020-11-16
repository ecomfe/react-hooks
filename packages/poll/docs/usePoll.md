---
title: usePoll
nav:
  title: Hooks
  path: /hook
group:
  title: Poll
  path: /poll
order: 2
---

# usePoll

Provides the ability to periodically request data, store it in a state.

```typescript
interface PollOptions {
    minInterval: number; // Minimum interval
    maxInterval?: number; // Maximum interval
    maxIdleTime?: number; // How long to wait before user is inactive without any action
    stopOnInactive?: boolean; // Stop poll when use is inactive
}
type PollHook<S> = [S | undefined, number];
function usePoll<S>(fetch: () => Promise<S>, options: number | PollOptions): PollHook<S>
```

The second number of returned tuple is `pendingCount` indicating how many requests are currently on the fly.

Without `options` argument, poll is triggered at a stable interval, time ellapsed between request and response are excluded from interval, the next request is started after `interval` milliseconds when response is arrived.

<code src='./demo/usePoll.tsx'>

By passing `options` argument with both `minInterval` and `maxInterval`, `usePoll` works in an "intelligent mode".

In this mode, poll interval varies between `minInterval` and `maxInterval` corresponding to whether use is active or not.

User active states are described as one of the three:

- Active: user is actively interacting with current view, poll will be triggered at an interval of `minInterval`.
- Unknown: user takes no activity for a while (specified by `maxIdleTime`, defaults to 30 seconds), poll will have an interval greater than `minInterval` but less than `maxInterval`.
- Inactive: user is completely inactive, e.g. document is hidden or window losts focus, poll will be stopped if `stopOnInactive` is `ture`, or will behave like when user is in unknown state.

<code src='./demo/usePoll2.tsx'>
