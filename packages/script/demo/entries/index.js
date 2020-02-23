import {useState, useEffect, Suspense} from 'react';
import {render} from 'react-dom';
import SimpleScript from '@/components/SimpleScript';
import WithSuspense from '@/components/WithSuspense';

const App = () => {
    const [json, setJSON] = useState('');
    useEffect(
        () => {
            const tick = setInterval(
                () => setJSON(JSON.stringify(window.dynamicScripts, null, '    ')),
                500
            );
            return () => clearInterval(tick);
        },
        []
    );

    return (
        <div>
            <h2>Simple Use Script</h2>
            <SimpleScript />
            <h2>Use With Suspense</h2>
            <Suspense fallback={<p>Currently Loading...</p>}>
                <WithSuspense />
            </Suspense>
            <p>Content Loaded:</p>
            <pre>
                {json}
            </pre>
        </div>
    );
};

render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
