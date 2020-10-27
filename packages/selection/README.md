# selection

Hooks about selecting on a list of items via mouse clicks.

```shell
npm install @huse/selection
```

## useSelection

This hook provides fundamental capabilities to select single, multiple or a range of items in a list.

```typescript
interface SelectionOptions {
    multiple?: boolean; // allow multiple selection using CMD or CTRL
    range?: boolean; // allow range selection using SHIFT
}

interface ClickContext {
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
}

interface SelectionMethods {
    selectIndex(index: number, e?: ClickContext): void;
}

type SelectionHook = [number[], SelectionMethods];

function useSelection(initialSelection: number[] = [], options?: SelectionOptions): SelectionHook;
```

`useSelection` is an index based interface where the content of list is not important.
The returned number array contains a set of selected zero-based item index.

The `selectIndex` function in `SelectionMethods` accepts an zero-based index and a `ClickContext`,
usually `MouseEvent` instance are compatible with `ClickContext` so you can directly pass an event object to it.

```jsx
import React from 'react';
import {useSelection} from '@huse/selection';

export default () => {
    const [selection, {selectIndex}] = useSelection([], {multiple: true, range: true});
    const dataSource = [
        {id: 1, text: 'Racing car sprays burning fuel into crowd.'},
        {id: 2, text: 'Japanese princess to wed commoner.'},
        {id: 3, text: 'Australian walks 100km after outback crash.'},
        {id: 4, text: 'Man charged over missing wedding girl.'},
        {id: 5, text: 'Los Angeles battles huge wildfires.'},
        {id: 6, text: 'The near-death experience brought new ideas to light.'},
        {id: 7, text: 'We have a lot of rain in June.'},
        {id: 8, text: 'He told us a very exciting adventure story.'},
        {id: 9, text: 'Every manager should be able to recite at least ten nursery rhymes backward.'},
        {id: 10, text: 'He would only survive if he kept the fire going and he could hear thunder in the distance.'},
        {id: 11, text: 'He swore he just saw his sushi move.'},
        {id: 12, text: 'The thunderous roar of the jet overhead confirmed her worst fears.'},
        {id: 13, text: 'He poured rocks in the dungeon of his mind.'},
        {id: 14, text: 'Grape jelly was leaking out the hole in the roof.'},
        {id: 15, text: 'The old apple revels in its authority.'},
    ];
    const renderItem = (item, i) => {
        const style = {
            height: 30,
            lineHeight: '30px',
            padding: '0 10px',
            borderBottom: '1px solid #ccc',
            cursor: 'default',
            userSelect: 'none',
            backgroundColor: selection.includes(i) ? '#e6f7ff' : undefined,
        };
        return (
            <li key={item.id} style={style} onClick={e => selectIndex(i, e)}>
                {item.text}
            </li>
        );
    };
    return (
        <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
            {dataSource.map(renderItem)}
        </ul>
    );
};
```
