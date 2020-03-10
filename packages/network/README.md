# @huse/network

检查网络状态相关的hooks。

## useOnLine

返回是否在线的`boolean`值。

```jsx
import {useOnLine} from '@huse/network';

const isOnLine = useOnLine;
return <div>You are currently {isOnLine ? 'ONLINE' : 'OFFLIEN'}</div>;
```
