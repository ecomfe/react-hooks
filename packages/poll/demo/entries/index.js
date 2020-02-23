import {useRef, useCallback} from 'react';
import {render} from 'react-dom';
import {usePoll} from '../../src';

const options = {
    minInterval: 5 * 1000,
    maxInterval: 20 * 1000,
    stopOnInactive: true,
    maxIdleTime: 30 * 1000,
};

const App = () => {
    const requestTime = useRef(new Date().toLocaleString());
    const responseTime = useRef(new Date().toLocaleString());
    const fetch = useCallback(
        async () => {
            requestTime.current = new Date().toLocaleString();
            await new Promise(resolve => setTimeout(resolve, 1200));
            responseTime.current = new Date().toLocaleString();
            return Math.random();
        },
        []
    );
    const [value, pendingCount] = usePoll(fetch, options);

    return (
        <div>
            <p>Request Start At: {requestTime.current}</p>
            <p>Response Arrived At: {responseTime.current}</p>
            <p>Random Value: {value}</p>
            <p>Current State: {pendingCount ? 'Fetching' : 'Waiting'}</p>
        </div>
    );
};

render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
