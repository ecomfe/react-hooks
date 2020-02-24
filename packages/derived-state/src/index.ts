import {useRef, useState} from 'react';
import {usePreviousValue} from '@huse/previous-value';

export type Derive<T> = (propValue: T, stateValue: T | undefined) => T;

export function useDerivedState<T>(propValue: T, compute: Derive<T> = v => v): [T, React.Dispatch<T>] {
    const [value, setValue] = useState(() => compute(propValue, undefined));
    const initialized = useRef(false);
    const previousPropValue = usePreviousValue(propValue);
    if (initialized.current && previousPropValue !== propValue) {
        setValue(state => compute(propValue, state));
    }
    initialized.current = true;
    return [value, setValue];
}
