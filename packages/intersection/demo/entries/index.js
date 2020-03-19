import {render} from 'react-dom';
import {useOnScreenValue} from '../../src';

const EMPTY_GIF = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

const Fly = () => {
    const [listenOnScreen, src] = useOnScreenValue(
        'https://mildaintrainings.com/wp-content/uploads/2017/11/react-logo.png',
        EMPTY_GIF
    );
    const style = {
        width: 300,
        height: 300,
        position: 'absolute',
        top: '120vh',
        left: '45vw',
        marginBottom: 60,
    };

    return (
        <img ref={listenOnScreen} style={style} src={src} />
    );
};

render(
    <Fly />,
    document.body.appendChild(document.createElement('div'))
);
