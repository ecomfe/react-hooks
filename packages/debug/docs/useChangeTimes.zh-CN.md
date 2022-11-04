---
title: useChangeTimes
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Debug
  path: /debug
order: 3
---

# useChangeTimes

和`useRenderTimes`一样，这个值从0开始的话, 只有当value值被实际改变时才会递增。

```typescript
function useChangeTimes<T>(value: T): number
```

<code src="./demo/useChangeTimes.tsx">

这个hook通过引用来识别“变化”，要检查一个值为什么发生变化，请尝试使用`useUpdateCause` hook。

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