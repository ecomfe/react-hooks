# @huse/poll

定期拉取数据的hook。

## usePoll

指定时间拉取数据，并返回`[response, pendingCount]`的组合。

可以普通地指定拉取时间：

```javascript
import {usePoll} from '@huse/poll';

const [notifications, pendingCount] = usePoll(fetchLastNotifications, 60 * 1000);
return (
    <header>
        {notifications.length} new messages
        <a onClick={refreshNotifications} disabled={!!pendingCount}>Refresh</a>
    </header>
    <ul>
        {notifications.map(renderNotification)}
    </ul>
)
```

另一个模式被称为智能模式，第2个参数传递一个对象，有以下属性：

```typescript
export interface PollOptions {
    minInterval: number; // 最短的拉取间隔
    maxInterval?: number; // 最长允许的拉取间隔
    maxIdleTime?: number; // 认为用户不再活跃前的等待时间
    stopOnInactive?: boolean; // 用户离开时是否继续拉取
}
```

用户的状态会被自动识别为3种可能性：

- 活跃：此时按最短时间拉取数据。
- 未知：当用户有一段时间没有任何活动（如鼠标移动等）后，会进入未知状态，此时使用最短与最长间隔间的某个值。
- 离开：当浏览器失去焦点、最小化等情况出现时，认为用户已经离开，此时如果`stopOnInactive`为`true`则停止拉取，否则与未知状态保持一致。

需要注意的是：当`stopOnInactive`配置打开时，用户离开时长超过`minInterval`，重新进入活跃状态时会立刻进行一次数据拉取，但这一次拉取可能会导致下一次拉取延时较长。
