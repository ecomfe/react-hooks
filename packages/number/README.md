# @huse/number

数字相关的hook。

## useCounter

```javascript
import {useCounter} from '@huse/boolean';

// default value is 0
const [value, {increment, inc, decrement, dec, reset}] = useCounter(3);

increment(); // becomes 1
inc(); // becomes 2
decrement(); //becomes 1
dec(); // becomes 0
reset(3); // becomes 3
reset(); // becomes 0
```
