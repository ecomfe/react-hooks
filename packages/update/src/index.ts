import {useReducer} from 'react';

export function useForceUpdate() {
    return useReducer((v: number) => v + 1, 0)[1];
}
