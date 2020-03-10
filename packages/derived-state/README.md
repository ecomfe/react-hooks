# @huse/derived-state

Derive a value from input.

## useDerivedState

This hook works like `getDerivedStateFromProps` in class components,
receiving a prop value and its managed state value to generate the derived value.

```typescript
export type Derive<P, S> = (propValue: P, stateValue: S | undefined) => S;

export function useDerivedState<P, S = P>(propValue: P, compute?: Derive<P, S>): [S, Dispatch<SetStateAction<S>>]
```

By default `compute` is `propValue => propValue`, this means state is always update to prop value when it changes.

Suppose we have a `getDerivedStateFromProps` implement in early days:

```jsx
class Foo extends Component {
    static getDerivedStateFromProps(props, state) {
        if (state.list !== props.list) {
            return {
                list: state.list ? props.list : state.list.concat(props.list),
            };
        }
    }
}
```

A corresponding implement with `useDerivedState` could be:

```jsx
import {useDerivedState} from '@huse/derived-state';

const Foo = ({list}) => {
    const [derivedList, setDerivedList] = useDerivedState(
        list,
        (propValue, stateValue) => {
            if (!stateValue) {
                return propValue;
            }
            return stateValue.concat(propValue);
        }
    );
};
```

On the initial derived, `stateValue` is `undefined`.

Note, this hook is to generate a state which will be updated later,
if only a computation from a prop value to a derived value is required without future update,
a combination of `usePreviousValue` from `@huse/previous-value` and `useMemo` is a better choice.
