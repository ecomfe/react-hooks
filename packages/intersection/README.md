# @huse/intersection

检查元素是否与屏幕相交的hook。

## useOnScreen

```javascript
import {useOnScreen} from '@huse/intersection';

const ref = useRef(null);
const isOnScreen = useOnScreen(ref, {rootMargin: '10px', threshold: '30%'});

return (
    <div ref={ref}>
        {isOnScreen && renderChildren()}
    </div>
);
```
