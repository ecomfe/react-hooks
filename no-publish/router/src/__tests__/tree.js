import {useEffect, useMemo} from 'react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router';

const noop = () => null;

export const Root = ({children, onChange = noop, url}) => {
    const history = useMemo(
        () => createMemoryHistory({initialEntries: [url], initialIndex: 0}),
        [url]
    );
    useEffect(
        () => history.listen(() => onChange(history)),
        [history, onChange]
    );

    return (
        <Router history={history}>
            {children}
        </Router>
    );
};
