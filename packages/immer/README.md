# @huse/immer

将`useReducer`、`useState`与[immer](https://github.com/immerjs/immer)进行整合。

## useImmerState

形同`useState`，返回的`setValue`允许使用`immer`函数：

```javascript
import {useImmerState} from '@huse/immer';

const [value, setValue] = useImmerState({value: 1});
// 可以直接设置值
setValue({value: 2});
// 也可以使用immer
setValue(state => void (state.value++));
```

## useImmerReducer

形同`useReducer`，其中`reducer`函数是一个`immer`函数：

```javascript
import {useImmerReducer} from '@huse/immer';

const [value, dispatch] = useImmerReducer(
    (state, action) => {
        switch (action.type) {
            case 'inc':
                state.value++;
            case 'dec':
                state.value--;
            case 'reset':
                state.value = action.payload || 0;
            default:
                break;
        }
    },
    {value: 0}
);
```
