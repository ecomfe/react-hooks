# @huse/selection

提供列表的鼠标点选功能。

## useSelection

```jsx
import {useSelection} from '@huse/selection';

const [selection, {selectIndex}] = useSelection(initialSelectedIndex);
const renderItem = (item, i) => (
    <li key={item.id} className={selection.includes(i) ? 'selected' : ''}> onClick={selectIndex}>
        {item.name}
    </li>
);

<ul>
    {dataSource.map(renderItem)}
</ul>
```

