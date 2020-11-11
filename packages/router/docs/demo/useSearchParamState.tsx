import React, {useCallback} from 'react';
import {Checkbox, Button} from 'antd';
import 'antd/dist/antd.min.css';
import {MemoryRouter, useLocation} from 'react-router-dom';
import {useLocationState, useSearchParamState} from '@huse/router';

export default () => {
    const App = () => {
        const location = useLocation();
        const [page, setPage] = useSearchParamState('page');
        const pageIndex = parseInt(page || '0', 10);
        const nextPage = useCallback(
            () => setPage((pageIndex + 1).toString()),
            [pageIndex, setPage]
        );
        const start = pageIndex * 10 + 1;
        const items = Array.from({length: 10}, (v, i) => ({id: start + i, name: `Item ${start + i}`}));
        return (
            <>
                <p>{location.pathname}{location.search}</p>
                <ul>
                    {items.map(i => <li key={i.id}>{i.name}</li>)}
                </ul>
                <Button type='primary' onClick={nextPage}>More Items</Button>
            </>
        );
    };
    return (
        <MemoryRouter initialEntries={['/list']}>
            <App />
        </MemoryRouter>
    );
};