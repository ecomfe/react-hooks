import {useEffect, useRef} from 'react';
import {useForceUpdate} from '@huse/update';

const CACHE: {[src: string]: boolean | Promise<void>} = {};

const loadScript = (src: string): Promise<void> => {
    const cache = CACHE[src];

    if (typeof cache === 'boolean') {
        throw new Error(`Script ${src} is already loaded`);
    }

    if (cache) {
        return cache;
    }

    const execute = (resolve: () => void, reject: () => void) => {
        const script = document.createElement('script');
        script.src = src;
        script.addEventListener(
            'load',
            () => {
                CACHE[src] = true;
                resolve();
            }
        );
        script.addEventListener(
            'error',
            () => {
                CACHE[src] = false;
                reject();
            }
        );
        document.head.appendChild(script);
    };
    const loading = new Promise<void>(execute);
    CACHE[src] = loading;
    return loading;
};

export function useScript(src?: string): [boolean, boolean] {
    const forceUpdate = useForceUpdate();
    const unmounted = useRef(false);
    useEffect(
        () => {
            if (!src) {
                return;
            }

            const result = CACHE[src];

            if (typeof result === 'boolean') {
                return;
            }

            const loading = loadScript(src);
            loading.finally(() => !unmounted.current && forceUpdate());
        },
        [forceUpdate, src]
    );
    useEffect(
        () => {
            unmounted.current = false;
            return () => {
                unmounted.current = true;
            };
        },
        []
    );

    return [
        !src || typeof CACHE[src] === 'boolean', // loaded
        !!src && CACHE[src] === false, // errored
    ];
}

// eslint-disable-next-line @reskript/no-excessive-hook
export function useScriptSuspense(src?: string): boolean {
    if (!src) {
        return true;
    }

    const result = CACHE[src];

    if (typeof result === 'boolean') {
        return result;
    }

    throw loadScript(src);
}
