import {useState, useCallback} from 'react';

interface ChangeEvent<T> {
    target: {value: T};
}

export interface InputValueState<T> {
    value: T;
    onChange(e: ChangeEvent<T>): void;
}

export function useInputValue<T extends string>(initialValue: T = '' as T): InputValueState<T> {
    const [value, setValue] = useState<T>(initialValue);
    const onChange = useCallback(
        (e: ChangeEvent<T>) => setValue(e.target.value),
        []
    );
    return {value, onChange};
}
