/* eslint-disable react/no-array-index-key */
import {render} from 'react-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import {useInfiniteScroll} from '../../src';
import c from './index.less';

const timeout = time => new Promise(resolve => setTimeout(resolve, time));

const fetchRandomNumbers = async () => {
    await timeout(1500);

    return {
        results: Array.from({length: 7}, () => (Math.random() * 1e7).toFixed()),
        hasMore: true,
    };
};

const colors = [
    '#506ae6',
    '#13b880',
    '#78bf12',
    '#eb7600',
    '#e65056',
    '#a64ee6',
    '#0f8cee',
    '#00b5d9',
    '#ebc500',
    '#e048ae',
];

const Item = ({value, index}) => (
    <div className={c.item} style={{backgroundColor: colors[index % colors.length]}}>
        #{index}&nbsp;{value}
    </div>
);

const Loading = ({dataLength}) => (
    <div className={c.item}>
        <ReactLoading type="bubbles" color={colors[dataLength % colors.length]} />
    </div>
);

const App = () => {
    const {dataSource, loadMore, hasMore} = useInfiniteScroll(fetchRandomNumbers, {initialLoad: true});

    return (
        <InfiniteScroll
            dataLength={dataSource.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<Loading dataLength={dataSource.length} />}
        >
            {dataSource.map((n, i) => <Item key={i} index={i} value={n} />)}
        </InfiniteScroll>
    );
};

render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
