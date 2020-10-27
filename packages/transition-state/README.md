# transition-state

Provide a hook which will go back to its default value after a certain duration when set to a new value.

```shell
npm install @huse/transition-state
```

## useTransitionState

Like `useState`, `useTransitionState` returns a `[value, setValue]` tuple, however when a new value takes effect via `setValue`, `value` will return to its default value after given duration.

This hook can be commonly used to show a temporary message.

```typescript
function useTransitionState<S>(defaultValue: S, defaultDuration?: number)
```

The `setValue` takes an extra `duration` argument to specify the time before value change back to default, it defaults to `defaultDuration` argument of `useTransitionState`.

```jsx
import React, {useCallback} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useTransitionState} from '@huse/transition-state';

export default () => {
    // Save data to server, mocked
    const saveData = () => new Promise(resolve => setTimeout(resolve, 20));
    const [message, setMessage] = useTransitionState('', 4 * 1000);
    const submit = useCallback(
        () => {
            // Will change back to "Submit" after 4 seconds
            saveData().then(() => setMessage('Saved!'));
        },
        [setMessage, saveData]
    );
    return (
        <>
            <Button onClick={submit}>Submit</Button>
            <span style={{color: '#4285f4', transition: 'all 1s ease-in', opacity: message ? 1 : 0}}>
                {message}
            </span>
        </>
    );
};
```
