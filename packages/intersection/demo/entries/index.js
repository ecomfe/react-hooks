import {render} from 'react-dom';
import {useOnScreen} from '../../src';

const Fly = () => {
    const [listenOnScreen, isOnScreen] = useOnScreen();
    const style = {
        width: 120,
        height: 120,
        lineHeight: '120px',
        textAlign: 'center',
        fontSize: 24,
        position: 'absolute',
        top: '120vh',
        left: '45vw',
        backgroundColor: '#158cee',
        color: '#fff',
    };

    return (
        <div ref={listenOnScreen} style={style}>
            {isOnScreen && 'In Screen'}
        </div>
    );
};

const App = () => (
    <Fly />
);

render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
