/* eslint-disable react/jsx-no-bind */
import {useState} from 'react';
import {useScript} from '../../../src';

const SimpleScript = () => {
    const [index, setIndex] = useState(0);
    useScript(index === 0 ? undefined : `/${index}.js`);

    return (
        <div>
            <button type="button" onClick={() => setIndex(1)}>Load Script 1</button>
            <button type="button" onClick={() => setIndex(2)}>Load Script 2</button>
        </div>
    );
};

export default SimpleScript;
