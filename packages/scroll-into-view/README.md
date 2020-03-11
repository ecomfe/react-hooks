# @huse/scroll-into-view

控制元素滚动到视图内。

## useScrollIntoView

```jsx
import {useRef} from 'react';
import {useScrollIntoView} from '@huse/scroll-into-view';

const Block = ({isFocused}) => {
    const ref = useRef(null);
    useScrollIntoView(ref, isFocused);

    return (
        <div ref={ref}>
            ...
        </div>
    );
};
```

具体的效果可参考`demo`目录。
