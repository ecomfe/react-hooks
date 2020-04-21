import {useCallback} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {parsePath, Location, LocationState} from 'history';
import {resolve} from './url';

export interface NavigateOptions<S = LocationState> {
    replace?: boolean;
    state?: S;
}

export type Navigate = <S>(to: Location<S> | string, options?: NavigateOptions<S>) => void;

export function useNavigate(): Navigate {
    const history = useHistory();
    const fromURL = useLocation();
    const navigate = useCallback<Navigate>(
        (to, options = {replace: false}) => {
            const toURL = typeof to === 'string' ? parsePath(to) : to;
            const pathname = resolve(fromURL.pathname, toURL.pathname);
            const destination = pathname;
            const toLocation = {
                ...toURL,
                state: options.state,
                pathname: destination,
            };
            history[options.replace ? 'replace' : 'push'](toLocation);
        },
        [fromURL.pathname, history]
    );
    return navigate;
}

export type UpdateLocationState<T> = (patch: Partial<T>) => void;

export function useLocationState<T>(defaultValue: T): [T, UpdateLocationState<T>] {
    const location = useLocation<T>();
    const history = useHistory();
    const setState = useCallback(
        (patch: Partial<T>): void => {
            const nextState = {...location.state, ...patch};
            const nextLocation = {
                ...location,
                state: nextState,
            };
            history.replace(nextLocation);
        },
        [history, location]
    );
    return [location.state ?? defaultValue, setState];
}
