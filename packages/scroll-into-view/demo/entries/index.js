/* eslint-disable react/jsx-no-bind */
import {render} from 'react-dom';
import {useState, useRef} from 'react';
import {useScrollIntoView} from '../../src';
import c from './index.less';

const Anchor = ({color, name, onClick}) => (
    <div className={c.anchor} style={{backgroundColor: color}} onClick={onClick}>
        {name}
    </div>
);

const Block = ({color, description, activeInView}) => {
    const ref = useRef(null);
    useScrollIntoView(ref, activeInView);

    return (
        <div ref={ref} className={c.block} style={{backgroundColor: color}}>
            {description}
        </div>
    );
};

const colors = [
    {color: '#506ae6', name: '天青', description: '明亮、专业'},
    {color: '#13b880', name: '翡色', description: '和谐、安全'},
    {color: '#78bf12', name: '苔绿', description: '生机、新生'},
    {color: '#eb7600', name: '赤橙', description: '力量、温暖'},
    {color: '#e65056', name: '枫叶', description: '进取、坚毅'},
    {color: '#a64ee6', name: '绛紫', description: '优雅、神秘'},
    {color: '#0f8cee', name: '靛蓝', description: '睿智、科技'},
    {color: '#00b5d9', name: '松绿', description: '希望、清新'},
    {color: '#ebc500', name: '郁金', description: '柔和、光明'},
    {color: '#e048ae', name: '洋红', description: '华丽、大胆'},
];

const App = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <div className={c.header}>
                {colors.map((c, i) => <Anchor key={c.color} {...c} onClick={() => setActiveIndex(i)} />)}
            </div>
            {colors.map((c, i) => <Block key={c.color} {...c} activeInView={i === activeIndex} />)}
        </div>
    );
};

render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
