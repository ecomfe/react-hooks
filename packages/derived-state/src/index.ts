import {useState, Dispatch, SetStateAction} from 'react';

export type Derive<P, S> = (propValue: P, stateValue: S | undefined) => S;

export function useDerivedState<P, S = P>(
    propValue: P,
    compute: Derive<P, S> = v => v as unknown as S
): [S, Dispatch<SetStateAction<S>>] {
    const [previousPropValue, setPreviousPropValue] = useState(propValue);
    const [value, setValue] = useState(() => compute(propValue, undefined));

    if (previousPropValue !== propValue) {
        setValue(state => compute(propValue, state));
        setPreviousPropValue(propValue);
    }

    return [value, setValue];
}
