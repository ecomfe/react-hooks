# @huse/debounce

提供延迟状态或回调的hook。

## useDebouncedValue

```javascript
import {useState} from 'react';
import {useDebouncedValue} from '@huse/debounce';

const [value, setValue] = useState('');
const debouncedValue = useDebouncedValue(value, 10); // debounced update 10ms

<>
    <div>
        <input value={value} onChange={e => setValue(e.target.value)} />
    </div>
    <div>
        Current Value: {debouncedValue}
    </div>
</>
```

## useDebouncedCallback

```javascript
import {useState} from 'react';
import {useDebouncedCallback} from '@huse/debounce';

const [list, setList] = useState([]);

// invokes after 200ms wait
const search = useDebouncedCallback(
    async e => {
        const items = await findByKeyword(e.target.value);
        setList(items);
    },
    200
);
```

在组件销毁后，函数不会再被执行。
