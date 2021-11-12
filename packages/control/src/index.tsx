import {useImperativeHandle, useRef, useMemo, useState} from 'react';

interface ControlMethods {
    [key: string]: (...args: any[]) => any;
}
type ProxyMethods<T> = {readonly $get: (property: string) => any} & Omit<T, '$get'>;
type ControlRef<T> = React.MutableRefObject<T>;

function createMethodsProxy(ref) {
    return new Proxy(
        {
            $get(property: string) {
                return ref.current[property];
            },
        },
        {
            get(target, property: string) {
                if (target[property]) {
                    return target[property];
                }
                const method = (...args) => {
                    const fn = ref.current[property];
                    return fn && fn(...args);
                };
                target[property] = method;
                return method;
            },
        }
    );
}

export function useControl<P, M = ControlMethods>(
    CompIn: React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<M>> | null
): [React.FunctionComponent<React.PropsWithoutRef<P>> | null, ProxyMethods<M>] {
    const ref = useRef({}) as ControlRef<M>;
    const methods = useMemo(
        () => createMethodsProxy(ref) as ProxyMethods<M>,
        []
    );

    const CompOut = useMemo(
        () => {
            if (!CompIn) {
                return null;
            }
            return function CompOut(props) {
                return <CompIn {...props} ref={ref} />;
            };
        },
        [CompIn]
    );

    return [CompOut, methods];
}


export function useControlSource<T, M = ControlMethods>(
    ref: ControlRef<M>,
    deriveMethods: (setData: React.Dispatch<React.SetStateAction<T>>) => M,
    initialData: T
): [T, M] {
    const [data, setData] = useState(initialData);
    const methods = useMemo(
        () => deriveMethods(setData),
        [deriveMethods, setData]
    );
    useImperativeHandle(ref, () => methods, [methods]);
    return [data, methods];
}
