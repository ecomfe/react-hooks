# @huse/update

提供强制渲染的基础hook。

## useForceupdate

```javascript
import {useForceUpdate} from '@huse/update';

const forceUpdate = useForceupdate();
forceUpdate(); // component will render
