import {render} from 'react-dom';
import {%hookName%} from '../../src';

const App = () => {
    return <div>Hello World</div>;
};

render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
