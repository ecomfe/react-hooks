import {render} from 'react-dom';
import {useMedia, usePreferDarkMode} from '../../src';

const App = () => {
    const isMobile = useMedia('only screen and (min-device-width : 320px) and (max-device-width : 480px)');
    const isPad = useMedia('only screen and (min-device-width : 768px) and (max-device-width : 1024px)');
    const isDarkMode = usePreferDarkMode();

    return (
        <div>
            <p>
                Possible Device:&nbsp;
                {isMobile ? 'Phone' : (isPad ? 'Pad' : 'Desktop')}
            </p>
            <p>
                Color Scheme:&nbsp;
                {isDarkMode ? 'Dark' : 'Light'}
            </p>
        </div>
    );
};

render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
