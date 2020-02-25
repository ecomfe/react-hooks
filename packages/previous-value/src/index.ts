import {useRef} from 'react';
import shallowEquals from 'shallowequal';
import deepEquals from 'fast-deep-equal';

type CustomEquals<T> = (previous: T | undefined, current: T) => boolean;

export function usePreviousValue<T>(value: T): T | undefined {
    const cache = useRef<T | undefined>(undefined);
    const previousValue = cache.current;
    cache.current = value;
    return previousValue;
}

export function usePreviousEquals<T>(value: T, equals: CustomEquals<T> = shallowEquals): boolean {
    const previousValue = usePreviousValue(value);
    return equals(previousValue, value);
}

export function useOriginalCopy<T>(value: T, equals: CustomEquals<T> = shallowEquals): T {
    const cache = useRef<T | undefined>(undefined);

    if (equals(cache.current, value)) {
        return cache.current as T;
    }

    cache.current = value;
    return value;
}

export function useOriginalDeepCopy<T>(value: T): T {
    return useOriginalCopy(value, deepEquals);
}
