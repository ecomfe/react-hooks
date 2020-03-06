# @huse/transition-state

Provide a hook which will go back to its default value after a certain duration when set to a new value.

## useTransitionState

Like `useState`, `useTransitionState` returns a `[value, setValue]` tuple, however when a new value takes effect via `setValue`, `value` will return to its default value after given duration.

This hook can be commonly used to show a temporary message.

```typescript
function useTransitionState<S>(defaultValue: S, defaultDuration?: number)
```

The `setValue` takes an extra `duration` argument to specify the time before value change back to default, it defaults to `defaultDuration` argument of `useTransitionState`.

```js
import {useTransitionState} from '@huse/transition-state';

const App = () => {
    const [buttonText, setButtonText] = useTransitionState('Submit', 4 * 1000);
    const submit = useCallback(
        async () => {
            await saveData();
            // Will change back to "Submit" after 4 seconds
            setButtonText('Saved!');
        },
        [setButtonText]
    );

    return (
        <>
            {/* form content */}
            <footer>
                <Button onClick={submit}>{buttonText}</Button>
            </footer>
        </>
    );
};
```
