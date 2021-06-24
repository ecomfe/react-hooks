import {useState, useCallback} from 'react';

export interface InputValueState<T> {
    value: T;
    onChange(e: any): void;
}

export function useInputValue<T = string>(initialValue: T): InputValueState<T> {
    const [value, setValue] = useState<T>(initialValue);
    const onChange = useCallback(
        (event: any) => {
            const v = event && event.target && 'value' in event.target
                ? (event.target as HTMLInputElement).value
                : event;
            setValue(v as T);
        },
        []
    );
    return {value, onChange};
}
