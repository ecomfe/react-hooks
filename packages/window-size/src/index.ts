import {useState, useEffect} from 'react';

export interface WindowSize {
    innerWidth: number;
    innerHeight: number;
    outerWidth: number;
    outerHeight: number;
}

const getWindowSize = (): WindowSize => {
    /* istanbul ignore next */
    if (typeof window === 'undefined') {
        return {
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
        };
    }
    return {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
    };
};

export function useWindowSize(): WindowSize {
    const [size, setSize] = useState(getWindowSize());
    useEffect(
        () => {
            /* istanbul ignore else */
            if (typeof window !== 'undefined') {
                const updateWindowSize = () => setSize(getWindowSize());
                window.addEventListener('resize', updateWindowSize);
                return () => window.removeEventListener('resize', updateWindowSize);
            }
        },
        []
    );
    return size;
}
