---
title: useChangeTimes
nav:
  title: Hooks
  path: /hook
group:
  title: Debug
  path: /debug
order: 3
---

# useChangeTimes

Like `useRenderTimes` but only increment when a value is actually changed, this value is zero based.

```typescript
function useChangeTimes<T>(value: T): number
```

<code src="./demo/useChangeTimes.tsx">


This hook identifies "change" by reference, to inspect why a value has changed, try `useUpdateCause` hook.

```javascript
import {useChangeTimes} from '@huse/debug';

const App = props => {
    const renderTimes = useChangeTimes(props.foo);

    console.log(renderTimes);

    return (
        // ...
    );
};
```