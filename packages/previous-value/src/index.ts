import {useRef, useEffect} from 'react';
import shallowEquals from 'shallowequal';
import deepEquals from 'fast-deep-equal';

type CustomEquals<T> = (previous: T | undefined, current: T) => boolean;

export function usePreviousValue<T>(value: T): T | undefined {
    const cache = useRef<T | undefined>(undefined);
    useEffect(
        () => {
            cache.current = value;
        },
        [value]
    );
    return cache.current;
}

export function usePreviousEquals<T>(value: T, equals: CustomEquals<T> = shallowEquals): boolean {
    const previousValue = usePreviousValue(value);
    return equals(previousValue, value);
}

export function useOriginalCopy<T>(value: T, equals: CustomEquals<T> = shallowEquals): T {
    const cache = useRef<T>(value);
    const equalsRef = useRef(equals);
    useEffect(
        () => {
            equalsRef.current = equals;
        },
        [equals]
    );
    useEffect(
        () => {
            if (!equalsRef.current(cache.current, value)) {
                cache.current = value;
            }
        },
        [value]
    );

    return equals(cache.current, value) ? cache.current : value;
}

export function useOriginalDeepCopy<T>(value: T): T {
    return useOriginalCopy(value, deepEquals);
}
