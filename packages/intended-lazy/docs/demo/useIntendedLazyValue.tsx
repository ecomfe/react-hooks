import React, {useState, useRef, FC, memo} from 'react';
import {Input, Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useIntendedLazyValue} from '@huse/intended-lazy';

const RenderCounter = () => {
    const renderCount = useRef(1);
    renderCount.current++;

    return (
        <p>This component is rendered {renderCount.current} times.</p>
    );
};

interface EagerValueReaderProps {
    value: string;
}

const EagerValueReader: FC<EagerValueReaderProps> = ({value}) => (
    <div>
        <h3>Eager Read Value</h3>
        <RenderCounter />
        <p>
            This is a traditional child component receiving parent's value and should render on each type in textbox.
        </p>
        <p>
            The current value is: <strong>{value}</strong>
        </p>
    </div>
);

const MemoedEagerValueReader = memo(EagerValueReader);

interface LazyValueReaderProps {
    readValue: () => string;
}

const LazyValueReader: FC<LazyValueReaderProps> = ({readValue}) => {
    const [lazyValue, setLazyValue] = useState('uninitialized');

    return (
        <div>
            <h3>Lazy Read Value</h3>
            <RenderCounter />
            <p>
                This component will not render when you type in textbox.
            </p>
            <p>
                The current value is: <strong>{lazyValue}</strong>
            </p>
            <p>
                This is out of sync with parent, but you can still
                {' '}
                <Button onClick={() => setLazyValue(readValue())}>Sync</Button>
                {' '}
                the value or in practice to read this value and start an API request.
            </p>
        </div>
    );
};

const MemoedLazyValueReader = memo(LazyValueReader);

export default () => {
    const [value, setValue] = useState('');
    const readValue = useIntendedLazyValue(value);

    return (
        <>
            <div>
                <label>
                    <Input
                        style={{marginBottom: 10}}
                        placeholder="Type Here"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </label>
            </div>
            <MemoedLazyValueReader readValue={readValue} />
            <MemoedEagerValueReader value={value} />
        </>
    );
};
