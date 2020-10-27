# update

Force component to update.

```shell
npm install @huse/update
```

## useForceupdate

Return a function which when invoked will update current component.

```typescript
function useForceUpdate(): () => void;
```

This could have a combination with `useRef` to implement some interesting staff such as a `useState`:

```javascript
import {useForceUpdate} from '@huse/update';

const useRefState = initialValue => {
    const state = useRef(initialValue);
    const forceUpdate = useForceUpdate();
    const setState = useCallback(
        value => {
            state.current = value;
            forceUpdate();
        },
        [forceUpdate]
    );
    return [state.current, setState];
};
```

Every time `forceUpdate` is invoked, component will have a re-render despite of other state changes or `memo` usage.

```jsx
import React, {useRef} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useForceUpdate} from '@huse/update';

export default () => {
    const renderTimes = useRef(0);
    const forceUpdate = useForceUpdate();
    renderTimes.current++;
    return (
        <div>
            Rendered {renderTimes.current} times
            <Button onClick={forceUpdate}>Update</Button>
        </div>
    );
};
```
