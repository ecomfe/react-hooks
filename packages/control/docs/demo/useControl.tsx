import {forwardRef} from 'react';
import {Modal as AModal, Drawer as ADrawer, Radio, ModalProps, DrawerProps, Steps} from 'antd';
import {partial} from 'lodash';
import 'antd/dist/antd.min.css';
import {useInputValue} from '@huse/input-value';
import {useRenderTimes} from '@huse/debug';
import {ControlRef, useControl, useControlSource} from '@huse/control';

const items = Array.from({length: 10}, (_, i) => String.fromCodePoint(0x1f600 + i));

type Params = [number?, string?];
type ExtraProps = {icons: typeof items};
interface ControlMethods {
    open(i: number, icon: string): void;
    close(): void;
}
type FowardedRef = ControlRef<ControlMethods>;

function createViewerMethods(setState): ControlMethods {
    return {
        close: partial(setState, []),
        open(i, content) {
            setState([i, content]);
        },
    };
}

const Modal = forwardRef<ControlMethods, DrawerProps & ExtraProps>(function Viewer(props, ref) {
    const [[i, icon], {close}] = useControlSource<Params, ControlMethods>(ref as FowardedRef, createViewerMethods, []);
    return (
        <AModal visible={!!icon} footer={<>第{i + 1}个</>} onCancel={close} {...props}>
            <div style={{textAlign: 'center'}}>
                <div style={{fontSize: 120}}>{icon}</div>
                <p>0x{icon?.codePointAt(0)?.toString(16).toUpperCase()}</p>
            </div>
        </AModal>
    );
});

const Drawer = forwardRef<ControlMethods, DrawerProps & ExtraProps>(function Viewer(props, ref) {
    const [[current], {close}] = useControlSource<Params, ControlMethods>(ref as FowardedRef, createViewerMethods, []);
    return (
        <ADrawer visible={current !== undefined} footer={null} onClose={close} {...props}>
            <Steps current={current} direction="vertical">
                {props.icons.map(icon => (<Steps.Step title={<big>{icon}</big>} />))}
            </Steps>
        </ADrawer>
    );
});


export default function Demo() {
    const typeProps = useInputValue('modal');
    const [MyViewer, {open: openViewer}] = useControl<(ModalProps | DrawerProps) & ExtraProps, ControlMethods>(
        typeProps.value === 'modal' ? Modal : Drawer
    );
    const handleClick = i => openViewer(i, items[i]);

    const renderTimes = useRenderTimes();

    return (
        <>
            <p>
                {items.map((item, i) => <button key={item} onClick={partial(handleClick, i)}>{item}</button>)}
            </p>
            <p>Click emoji to preview detail. <small>{renderTimes}</small></p>
            <div>
                <Radio.Group size="small" {...typeProps}>
                    <Radio.Button value="modal">Modal</Radio.Button>
                    <Radio.Button value="drawer">Drawer</Radio.Button>
                </Radio.Group>
            </div>
            <MyViewer icons={items} title="Emoji Viewer" />
        </>
    );
}
