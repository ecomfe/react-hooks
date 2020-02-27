import {render} from 'react-dom';
import {useState, useCallback, useReducer} from 'react';
import {Slider, Button} from 'antd';
import {useElementResize, useElementSize} from '../../src';

const Content = ({height, onResize}) => {
    const listenResize = useElementResize(onResize);
    const [listenSize, size] = useElementSize();
    const ref = useCallback(
        element => {
            listenResize(element);
            listenSize(element);
        },
        [listenResize, listenSize]
    );
    const style = {
        height,
        backgroundColor: '#158cee',
        color: '#fff',
        fontSize: 60,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div ref={ref} style={style}>
            {size && `${size.width} x ${size.height}`}
        </div>
    );
};

const App = () => {
    const [height, setHeight] = useState(240);
    const [resizes, addResize] = useReducer(
        state => state.concat(new Date()),
        []
    );
    const [visible, toggleVisible] = useReducer(v => !v, true);

    return (
        <div>
            <h2 style={{textAlign: 'center'}}>Slide To Change Height</h2>
            <div style={{display: 'flex'}}>
                <Slider style={{flex: 1}} defaultValue={height} min={100} max={500} onAfterChange={setHeight} />
                <Button onClick={toggleVisible}>Toggle</Button>
            </div>
            {visible && <Content height={height} onResize={addResize} />}
            <ul style={{marginTop: 20}}>
                {resizes.map(t => <li key={t.valueOf()}>Resized at {t.toLocaleString()}</li>)}
            </ul>
        </div>
    );
};

render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
