# @huse/input-value

快速与输入类元素对接状态的hook。

## useInputValue

```javascript
import {useInputValue} from '@huse/input-value';

const name = useInputValue('');
const age = useInputValue(10);

<div>
    <label>Username: <input {...name} /></label>
</div>
<div>
    <label>Age: <input type="number" {...age} /></label>
</div>
```
