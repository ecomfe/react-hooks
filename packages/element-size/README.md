# @huse/element-size

与元素尺寸相关的hook。

## useElementResize

当元素尺寸变化时调用相应函数。

```javascript
import {useElementResize} from '@huse/element-size';

const ref = useRef(null);
const onResize = useCallback(
    () => console.log('Resized'),
    []
);
useElementResize(onResize);

return (
    <div ref={ref}>
        Hello World
    </div>
);
```

## useElementSize

获取并同步元素的尺寸，返回结构如下：

```typescript
interface Size {
    width: number; // offsetWidth
    height: number; // offsetHeight
}
```

在未初始化时，返回`undefined`。

```javascript
import {useElementSize} from '@huse/element-size';

const ref = useRef(null);
const size = useElementSize(ref);

return (
    <div>
        {size & `${size.width} x ${size.height}`}
    </div>
);
```
