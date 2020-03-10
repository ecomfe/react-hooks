import {useRef, Ref, RefCallback, MutableRefObject} from 'react';
import {usePreviousEquals} from '@huse/previous-value';

export type RefLike<T> = Ref<T> | null | undefined;

function arrayShallowEquals<T>(x: Array<RefLike<T>> | undefined, y: Array<RefLike<T>>) {
    if (x?.length !== y.length) {
        return false;
    }

    for (let i = 0; i < x.length; i++) {
        if (x[i] !== y[i]) {
            return false;
        }
    }

    return true;
}

function isCallbackRef<T>(ref: RefLike<T>): ref is RefCallback<T> {
    return typeof ref === 'function';
}

function mergeRefs<T>(refs: Array<RefLike<T>>): RefCallback<T> {
    return (value: T) => {
        for (const ref of refs) {
            if (isCallbackRef(ref)) {
                ref(value);
            }
            else if (ref) {
                // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
                (ref as MutableRefObject<T>).current = value;
            }
        }
    };
}

export function useMergedRef<T>(refs: Array<RefLike<T>>): RefCallback<T> {
    // To allow difference length of `ref` array, we need a loose version of `useCallback`
    const mergedCallbackRef = useRef<RefCallback<T> | undefined>();
    const areRefsEqual = usePreviousEquals(refs, arrayShallowEquals);

    // The `!mergedCallbackRef.current` part is to "cheat" TypeScript.
    if (!areRefsEqual || !mergedCallbackRef.current) {
        mergedCallbackRef.current = mergeRefs(refs);
    }

    return mergedCallbackRef.current;
}
