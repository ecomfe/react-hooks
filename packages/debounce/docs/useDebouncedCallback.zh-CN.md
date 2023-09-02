---
title: useDebouncedCallback
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Debounce
  path: /debounce
order: 4
---

# useDebouncedCallback

将要防抖的函数放入callback函数中。

```typescript
function useDebouncedCallback<C extends Function>(callback: C, wait: number): C
```

注意队列中所有异步任务的执行，当碰到组件销毁和`callback`或`wait`参数改变时会被取消。

```javascript
import {useState} from 'react';
import {useDebouncedCallback} from '@huse/debounce';

const [list, setList] = useState([]);

// 等待200ms后被调用
const search = useDebouncedCallback(
    async e => {
        const items = await findByKeyword(e.target.value);
        setList(items);
    },
    200
);
```