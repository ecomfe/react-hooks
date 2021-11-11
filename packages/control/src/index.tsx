import {useImperativeHandle, useRef, useMemo, useState} from 'react';

interface ControlMethods {
    [key: string]: (...args: any[]) => any;
}
interface ProxyMethods extends ControlMethods {
    $get: (property: string) => any;
}

function createMethodsProxy(ref: React.MutableRefObject<ControlMethods>): ProxyMethods {
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

export function useControl(
    CompIn: React.ForwardRefExoticComponent<ControlMethods> | null
): [React.FunctionComponent | null, ProxyMethods] {
    const ref = useRef({});
    const methods = useMemo(
        () => createMethodsProxy(ref),
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


export function useControlSource<T>(
    ref: React.MutableRefObject<ControlMethods>,
    initialData: T | undefined,
    deriveMethods: (setData: React.Dispatch<React.SetStateAction<T | undefined>>) => ControlMethods
) {
    const [data, setData] = useState(initialData);
    const methods = useMemo(
        () => deriveMethods(setData),
        [deriveMethods, setData]
    );
    useImperativeHandle(ref, () => methods, [methods]);
    return [data, methods];
}
