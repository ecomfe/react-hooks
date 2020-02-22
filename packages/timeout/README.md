# @huse/timeout

延时执行相关的hook。

## useTimeout

在指定时间后执行。

```javascript
import {useTimeout} from '@huse/timeout';

const callback = () => {
    console.log('trigger');
};
useTimeout(callback, 200); // executes after 200ms
```

时间指定为`-1`则会取消执行。

## useInterval

按一定时间间隔执行。

在指定时间后执行。

```javascript
import {useInterval} from '@huse/timeout';

const callback = () => {
    console.log('trigger');
};
useInterval(callback, 200); // executes every 200ms
```

时间指定为`-1`则会取消执行。

`useInterval`并不会立刻执行函数，如果需要立刻执行一次，并且每隔一段时间重复执行，可以补一个`useEffect`来实现。

## useStableInterval

与`useInterval`相同，但会在函数执行完后再准确间隔指定时间后执行下一次。

如指定间隔400毫秒，函数执行需要300毫秒，则第一次会在400毫秒时执行，第2次会在1100毫秒（400 + 300 + 400)时执行。

如果函数为异步函数，则会在异步返回后再等待固定时间执行。

```javascript
import {useInterval} from '@huse/timeout';

const callback = async () => {
    const list = await fetchNotifications();
    console.log(list.length, 'notifications');
};
useInterval(callback, 200); // executes every 200ms after async resolved
```
