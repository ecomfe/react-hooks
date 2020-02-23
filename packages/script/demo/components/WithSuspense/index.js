/* eslint-disable react/jsx-no-bind */
import {useState} from 'react';
import {useScriptSuspense} from '../../../src';

const WithSuspense = () => {
    const [index, setIndex] = useState(0);
    useScriptSuspense(index === 0 ? undefined : `/${index}.js`);

    return (
        <div>
            <button type="button" onClick={() => setIndex(3)}>Load Script 3</button>
            <button type="button" onClick={() => setIndex(4)}>Load Script 4</button>
        </div>
    );
};

export default WithSuspense;
