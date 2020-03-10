# @huse/update

提供强制渲染的基础hook。

## useForceupdate

```jsx
import {useForceUpdate} from '@huse/update';

const forceUpdate = useForceupdate();
forceUpdate(); // component will render
