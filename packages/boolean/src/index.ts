import {useMethods} from '@huse/methods';

const reducers = {
    on() {
        return true;
    },
    off() {
        return false;
    },
    toggle(value: boolean) {
        return !value;
    },
};

export function useBoolean(initialValue: boolean = false) {
    return useMethods(reducers, initialValue);
}

export function useSwitch(initialValue: boolean = false) {
    const [value, {on, off, toggle}] = useBoolean(initialValue);
    return [value, on, off, toggle] as const;
}

export function useToggle(initialValue: boolean = false) {
    const [value, {toggle}] = useBoolean(initialValue);
    return [value, toggle] as const;
}
