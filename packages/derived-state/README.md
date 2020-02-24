# @huse/derived-state

从`props`衍生出对应状态的hook。

## useDerivedState

这个hook相当于`getDerivedStateFromProps`的效果，如下代码：

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

表达的含义为“每一次`props.list`更新时，将它添加到`state.list`后面”，那么它可以对应变成：

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

当`props.list`变化时，`useDerivedState`第二个参数的函数会被执行，将`(propValue, stateValue)`作为参数。这个函数的默认值为返回`propValue`。

第一次执行时，`stateValue`的值为`undefined`。

需要注意的是，如果仅仅需要“通过`props`的变化计算出一个可用的值”，而不需要在后续重新更新这个状态，则应当用`@huse/previous-value`中的`usePreviousValue`配合`useMemo`进行计算，不适用于这个hook。
