# @huse/number

Hooks to manage and mutate number types.

## useCounter

Manges number as a counter which can increment and decrement.

This is a wrap of `useMethods` in `@huse/methods` and contains methods below:

```typescript
{
    increment(): void; // plus 1
    inc(): void;
    decrement(): void; // subtract 1
    dec(): void;
    reset(value?: number): void; // reset to value, defaults to 0
}
```

`inc` is an alias to `increment` and `dec` is an alias to `decrement`.

```jsx
import {Button} from 'antd';
import {useCounter} from '@huse/number';

const App = () => {
    const [value, {increment, decrement, reset}] = useCounter(3);

    return (
        <>
            <Button onClick={decrement}>-1</Button>
            <span style={{padding: '0 10px'}}>{value}</span>
            <Button onClick={increment}>+1</Button>
            <Button onClick={() => reset()}>Reset</Button>
        </>
    );
};
```
