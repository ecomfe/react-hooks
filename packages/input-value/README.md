# @huse/input-value

Generates `value` and `onChange` that satisfies input elements.

## useInputValue

To get rid of the duplication of `e => setState(e.target.value)`, `useInputValue` returns an object containing both `value` and change event aware `onChange`.

```typescript
interface InputValueState {
    value: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
}
function useInputValue(initialValue: string = ''): InputValueState;
```

This hook is better used with `{...props}` syntax in JSX.

```jsx
import {useInputValue} from '@huse/input-value';

const App = () => {
    const name = useInputValue('');
    const age = useInputValue(10);

    return (
        <>
            <div>
                <label>Username: <input {...name} /></label>
            </div>
            <div>
                <label>Age: <input type="number" {...age} /></label>
            </div>
        </>
    );
};
```
