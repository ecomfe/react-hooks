import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Spin, Button, Slider, notification} from 'antd';
import 'antd/dist/antd.min.css';
import {useRequest} from '@huse/request';

export default () => {
    const [base, setBase] = useState(0);
    const generateRandom = useCallback(
        // Delay for 1.5s and resolve with a random value
        ({base}) => new Promise(resolve => setTimeout(() => resolve(base + Math.random()), 1500)),
        []
    );
    const result = useRequest(generateRandom, {base});
    return (
        <>
            <div>
                Base Value: <Slider value={base} min={0} max={9} onChange={setBase} />
            </div>
            <div>
                {result.pending
                    ? <Spin />
                    : <p>Generated Value: <span style={{ color: 'red' }}>{result.data}</span></p>
                }
            </div>
        </>
    );
};