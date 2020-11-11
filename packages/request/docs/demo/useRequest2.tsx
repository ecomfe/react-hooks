import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Spin, Button, Slider, notification} from 'antd';
import 'antd/dist/antd.min.css';
import {useRequest} from '@huse/request';

export default () => {
    const generateRandom = useCallback(
        // Delay for 1.5s and resolve with a random value
        () => new Promise(resolve => setTimeout(() => resolve(Math.random()), 1500)),
        []
    );
    // Simuate situation that will request with a limited set of params
    const [base, setBase] = useState(0);
    const result = useRequest(generateRandom, {base}, {strategy: 'waitAccept'});
    // Refetch every 3s, since we have 2 base values, a notification should shown each 6s
    useEffect(
        () => {
            const tick = setTimeout(
                () => setBase(v => (v + 1) % 2),
                3 * 1000
            );
            return () => clearTimeout(tick);
        },
        [base]
    );
    // Notify for accept
    useEffect(
        () => {
            if (!result.nextData) {
                return;
            }
            const acceptAndClose = () => {
                notification.close('new-value');
                result.accept();
            };
            const options = {
                key: 'new-value',
                message: 'New Data Arrives',
                description: 'There is new data arrived, click confirm to refresh',
                btn: (
                    <Button type="primary" size="small" onClick={acceptAndClose}>
                        Confirm
                    </Button>
                ),
            };
            notification.open(options);
        },
        [result.nextData, base]
    );
    console.log(result);
    return result.data ? <div>Changed Result: <span style={{color:'red'}}>{result.data}</span></div> : <Spin />;
};