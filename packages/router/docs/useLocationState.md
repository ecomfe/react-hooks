---
title: useLocationState
nav:
  title: Hooks
  path: /hook
group:
  title: Router
  path: /router
order: 3
---

# useLocationState

Wrap `location.state` to a react state tuple.

```typescript
type UpdateLocationState<T> = (patch: Partial<T>) => void;

function useLocationState<T>(defaultValue: T): [T, UpdateLocationState<T>];
```

Commonly we store invisible but persist state like list selections inside it.

```javascript
import {useLocationState} from '@huse/router';
import {Checkbox} from 'antd';

const App = () => {
    const [{selected}, setSelection] = useLocationState({selected: []});
    const pushSelected = useCallback(
        id => setSelection({selected: [...selected, id]}),
        [selected, setSelection]
    );
    const removeSelected = useCallback(
        id => {
            const index = selected.indexOf(id);
            setSelection({selected: [...selected.slice(0, index), ...selected.slice(index + 1)]});
        },
        [selected, setSelection]
    );
    const items = Array.from({length: 10}, (v, i) => ({id: i, name: `Item ${i}`}));
    const renderItem = ({id, name}) => (
        <tr key={id}>
            <th>
                <Checkbox onChange={e => (e.target.checked ? pushSelected(id) : removeSelected(id))} />
            </th>
            <td>
                {name}
            </td>
        </tr>
    );

    return (
        <table>
            <tbody>
                {items.map(renderItem)}
            </tbody>
        </table>
    );
};
```