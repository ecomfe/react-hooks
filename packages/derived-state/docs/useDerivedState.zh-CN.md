---
title: useDerivedState
nav:
  title: Hooks
  path: /zh-CN/hook
group:
  title: Derived State
  path: /derived-state
order: 2
---

# useDerivedState

这个hook的工作原理很像class组件中的`getDerivedStateFromProps`函数,
通过接收一个props和state参数, 产生新的value值。

```typescript
export type Derive<P, S> = (propValue: P, stateValue: S | undefined) => S;

export function useDerivedState<P, S = P>(propValue: P, compute?: Derive<P, S>): [S, Dispatch<SetStateAction<S>>]
```

默认情况下, `compute`是从`一个prop的值到另外一个prop值变化的过程`, 这就意味着当prop的值发生改变的时候state会相应发生更新变化。

之前我们可以使用`getDerivedStateFromProps`来实现:

```javascript
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

与之对应的使用`useDerivedState`来实现如下:

```javascript
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

关于初始值`stateValue` 是 `undefined`。

<code src='./demo/useDerivedState.tsx'>

注意，这个hook是为了生成一个即将被更新的state, 
如果只是从一个prop的值到另外一个值的计算，不需要更新,
`@huse/previous-value` 中`usePreviousValue`和`useMemo`的组合可能会更好一点。