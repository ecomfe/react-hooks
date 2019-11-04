import {useMemo, useCallback} from 'react';
import {useHistory} from 'react-router';
import uriTemplate, {URITemplate} from 'uri-templates';

type Visit<T> = (params: T) => void;

export interface NavigateOptions {
    replace?: boolean;
}

export function useNavigate<T>(to: string | URITemplate, options: NavigateOptions = {}): Visit<T> {
    const history = useHistory();
    const {replace} = options;
    const template = useMemo(
        () => {
            if (typeof to === 'string') {
                return uriTemplate(to);
            }
            return to;
        },
        [to]
    );
    const visit = useCallback(
        (params: T): void => {
            const newLocation = template.fill(params as any);
            if (replace) {
                history.replace(newLocation);
            }
            else {
                history.push(newLocation);
            }
        },
        [template, history, replace]
    );
    return visit;
}
