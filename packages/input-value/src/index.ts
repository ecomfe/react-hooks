import {useState, useCallback} from 'react';

interface ChangeEvent {
    target: {value: string};
}

export interface InputValueState {
    value: string;
    onChange(e: ChangeEvent): void;
}

export function useInputValue(initialValue: string = ''): InputValueState {
    const [value, setValue] = useState(initialValue);
    const onChange = useCallback(
        (e: ChangeEvent) => setValue(e.target.value),
        []
    );
    return {value, onChange};
}
