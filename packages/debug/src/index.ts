import {useRef, useEffect} from 'react';
import shallowEquals from 'shallowequal';
import deepEquals from 'fast-deep-equal';
import keyBy from 'lodash/keyBy';
import {usePreviousValue} from '@huse/previous-value';

export function useRenderTimes(): number {
    const count = useRef(0);

    count.current++;

    return count.current;
}

export function useChangeTimes<T>(value: T): number {
    const count = useRef(0);
    const previousValue = usePreviousValue(value);
    const mounted = useRef(false);
    useEffect(
        () => {
            mounted.current = true;
        },
        []
    );

    if (mounted.current && value !== previousValue) {
        count.current++;
    }

    return count.current;
}

export interface UpdateCause {
    propName: string;
    shallowEquals: boolean;
    deepEquals: boolean;
    previousValue: any;
    currentValue: any;
}

function findUpdateCause<T extends {}>(previous: T, current: T): UpdateCause[] {
    const causes = [] as UpdateCause[];
    const keys = Object.keys(previous);

    for (const key of keys) {
        const previousValue = previous[key];
        const currentValue = current[key];

        if (previousValue !== currentValue) {
            const cause: UpdateCause = {
                previousValue,
                currentValue,
                propName: key,
                shallowEquals: shallowEquals(previousValue, currentValue),
                deepEquals: deepEquals(previousValue, currentValue),
            };
            causes.push(cause);
        }
    }

    return causes;
}

export function useUpdateCause<T extends {}>(props: T, print: boolean = true): UpdateCause[] {
    const previous = usePreviousValue(props);

    if (previous === undefined) {
        return [];
    }

    const causes = findUpdateCause(previous, props);

    if (print && causes.length) {
        /* eslint-disable no-console */
        console.warn('Component updated from props changes');
        console.table(keyBy(causes, c => c.propName), ['previousValue', 'currentValue', 'shallowEquals', 'deepEquals']);
        /* eslint-enable no-console */
    }

    return causes;
}
