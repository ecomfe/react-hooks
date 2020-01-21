import {useState, useCallback, ChangeEvent} from 'react';

export interface InputValueState {
    value: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
}

export function useInputValue(initialValue: string = ''): InputValueState {
    const [value, setValue] = useState(initialValue);
    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        []
    );
    return {value, onChange};
}
