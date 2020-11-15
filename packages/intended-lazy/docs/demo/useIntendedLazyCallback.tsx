import React, {useState, useRef, FC, memo, useCallback} from 'react';
import {Input, Button} from 'antd';
import 'antd/dist/antd.min.css';
import {useIntendedLazyCallback} from '@huse/intended-lazy';

const timeout = (time: number) => new Promise(resolve => setTimeout(resolve, time));

const infoOfUser = async (username: string) => {
    await timeout(200);
    const year = Math.floor(Math.random() * 30 + 1990);
    const month = Math.floor(Math.random() * 11 + 1);
    const day = Math.floor(Math.random() * 26 + 1);

    return `${username} borns on ${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

interface UserProps {
    info?: string;
    onFetchInfo: () => void;
}

const UserInfo: FC<UserProps> = ({info, onFetchInfo}) => {
    const renderTimes = useRef(1);
    renderTimes.current++;

    return (
        <>
            <p>
                {info ?? <Button onClick={onFetchInfo}>Load</Button>}
            </p>
            <p>
                This component is rendered {renderTimes.current} times.
            </p>
        </>
    );
};

const MemoedUserINfo = memo(UserInfo);

export default () => {
    const [name, setName] = useState('');
    const [userInfo, setUserInfo] = useState<string | undefined>();
    // This callback should change according to name state
    const fetchInfo = useCallback(
        async () => {
            const userInfo = await infoOfUser(name);
            setUserInfo(userInfo);
        },
        [name]
    );
    // Make it reference stable
    const lazyFetchInfo = useIntendedLazyCallback(fetchInfo);

    return (
        <>
            <div>
                <Input
                    style={{marginBottom: 10}}
                    placeholder="Enter User Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <MemoedUserINfo info={userInfo} onFetchInfo={lazyFetchInfo} />
        </>
    );
};
