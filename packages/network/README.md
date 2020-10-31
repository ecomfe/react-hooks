# network

Provides hooks to resolve and listen on network states like online or connectivity.

```shell
npm install @huse/network
```

## useOnLine

`useOnLine` returns a boolean indicates whether client is currently online.

In case where client doesn't support `online` and `offline` events, this hook always returns `true`.

```jsx
import React from 'react';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import {useOnLine} from '@huse/network';

export default () => {
    const isOnLine = useOnLine();
    return (
        <>
            {isOnLine ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
            You are currently
            <strong>{isOnLine ? 'ONLINE' : 'OFFLINE'}</strong>
        </>
    )
};
```
