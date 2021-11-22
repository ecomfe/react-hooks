import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import capitalize from 'lodash/capitalize';
import {useMemo} from 'react';

type Slot = React.FC | React.ReactNode;

export type SlotProps<T extends string> = {
    $slots?: {[key in T]?: Slot};
    // 会报错？ https://github.com/microsoft/TypeScript/pull/44512#issuecomment-975399446
    // [key: `render${Capitalize<T>}`]?: Slot;
};

interface UseSlotOptions<T extends string, P> {
    mapProps?: (props: P) => ({[key in T]: ({} | undefined)} | undefined);
    getSlotPropName?: (name: string) => string;
}

export function useSlot<N extends string, P extends SlotProps<N>, S = Record<string, any>>(props: P, {
    mapProps,
    getSlotPropName = defaultGetSlotPropName
}: UseSlotOptions<N, P> = {}) {
    const WrappedSlot = useMemo(
        function () {
            const slots = createSlots<N>(props, getSlotPropName);
            return function WrappedSlot(slotProps: React.PropsWithChildren<{name?: N} & S>) {
                const {name} = slotProps;
                const scopedProps = mapProps ? mapProps(props) : undefined;
                return (<Slot {...scopedProps?.[name]} {...slotProps} render={slots[name]} />);
            };
        },
        [props, mapProps, getSlotPropName]
    );

    return WrappedSlot;
}

function createSlots<T extends string>(props: SlotProps<T>, getField: typeof defaultGetSlotPropName) {
    return new Proxy(
        {} as {[key in T]: Slot},
        {
            get(target, name: string) {
                if (!target[name]) {
                    target[name] = props.$slots?.[name] ?? props[getField(name)];
                }
                return target[name];
            }
        }
    );
}

function defaultGetSlotPropName(name: string): string {
    return 'render' + capitalize(name);
}

function Slot(props: React.PropsWithChildren<{
    render?: Slot,
    default?: Slot
}>) {
    const {render, default: defaultRender, children = null} = props;
    const Comp = !isUndefined(render) ? render : (defaultRender ?? children);
    return isFunction(Comp) ? <Comp {...props} /> : <>{Comp}</>;
}
