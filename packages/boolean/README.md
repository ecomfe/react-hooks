# boolean

Provides hooks to work with `boolean` primitive type.

```shell
npm install @huse/boolean
```

## useBoolean

`useBoolean` returns a `[value, methods]` tuple, in which methods are listed as:

```typescript
interface BooleanMethods {
    // Change value to true
    on(): void;
    // Change value to false
    off(): void;
    // Toggle current value
    toggle(): void;
}
```

```jsx
import React from 'react';
import {Button, Switch} from 'antd';
import 'antd/dist/antd.min.css';
import {useBoolean} from '@huse/boolean';

export default () => {
    const [value, {on, off, toggle}] = useBoolean();
    return (
        <>
            <div>
                <Button style={{marginRight: 20}} type="primary" onClick={on}>Switch On</Button>
                <Button style={{marginRight: 20}} type="danger" onClick={off}>Switch Off</Button>
                <Button style={{marginRight: 20}} onClick={toggle}>Toggle Value</Button>
            </div>
            <p>Current value: <Switch checked={value} /></p>
        </>
    )
};
```

## useSwitch

`useSwitch` returns a `[value, on, off, toggle]` tuple, this is simple a wrapper hook around `useBoolean` and expand all methods into tuple.

## useToggle

`useToggle` returns a `[value, toggle]` tuple.
