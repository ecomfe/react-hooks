import {useState, useRef, useEffect, useCallback} from 'react';

export function useTransitionState<S>(defaultValue: S, defaultDuration: number = -1) {
    const [value, setValue] = useState(defaultValue);
    const durationRef = useRef(defaultDuration);
    useEffect(
        () => {
            if (value !== defaultValue && durationRef.current >= 0) {
                const tick = setTimeout(
                    () => setValue(defaultValue),
                    durationRef.current
                );

                return () => clearTimeout(tick);
            }
        },
        [defaultValue, value]
    );
    const setTransition = useCallback(
        (value: S, duration: number = defaultDuration) => {
            durationRef.current = duration;
            setValue(value);
        },
        [defaultDuration]
    );
    return [value, setTransition];
}
