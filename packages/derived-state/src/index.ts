import {useRef, useState, Dispatch, SetStateAction} from 'react';
import {usePreviousValue} from '@huse/previous-value';

export type Derive<P, S> = (propValue: P, stateValue: S | undefined) => S;

export function useDerivedState<P, S = P>(
    propValue: P,
    compute: Derive<P, S> = v => v as unknown as S
): [S, Dispatch<SetStateAction<S>>] {
    const [value, setValue] = useState(() => compute(propValue, undefined));
    const initialized = useRef(false);
    const previousPropValue = usePreviousValue(propValue);
    if (initialized.current && previousPropValue !== propValue) {
        setValue(state => compute(propValue, state));
    }
    initialized.current = true;
    return [value, setValue];
}
