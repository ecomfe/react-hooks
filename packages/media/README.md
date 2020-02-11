# @huse/media

判断媒体查询是否命中，当设备或视图变化时会监听命中的变化。

```javascript
import {useMedia} from '@huse/media';

const isDesktop = useMedia('only screen and (min-width : 1224px)');
```
