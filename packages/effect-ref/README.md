# @huse/effect-ref

使用一个[回调ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#callback-refs)以`useEffect`的形式处理DOM元素。

## useEffectRef

返回一个函数，将该函数通过`ref`传递给DOM元素可以获得类似`useEffect`的效果。

传递给`useEffectRef`的函数与`useEffect`相似，但接收元素对象为参数，它可以返回一个销毁用函数。

```javascript
import {useState, useCallback} from 'react';
import {useEffectRef} from '@huse/effect-ref';
import elementResizeDetectorMaker from 'element-resize-detector';

const resizeDetector = elementResizeDetectorMaker({strategy: 'scroll'});

const App = () => {
    const [size, setSize] = useState(null);
    const observeResize = useCallback(
        element => {
            const listener = () => setSize({width: element.offsetWidth, height: element.offsetHeight});

            resizeDetector.listenTo(element, listener);

            return () => {
                listener.removeListener(element, listener);
            };
        },
        []
    );
    const ref = useEffectRef(observeResize);

    return (
        <div ref={ref}>
            Resize Observable
        </div>
    );
}
```
