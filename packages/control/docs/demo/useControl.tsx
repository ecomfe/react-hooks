import {forwardRef} from 'react';
import {Modal as AModal, Drawer as ADrawer, Radio, ModalProps, DrawerProps} from 'antd';
import {partial} from 'lodash';
import 'antd/dist/antd.min.css';
import {useInputValue} from '@huse/input-value';
import {useRenderTimes} from '@huse/debug';
import {useControl, useControlSource} from '@huse/control';

const items = Array.from({length: 10}, (_, i) => String.fromCodePoint(0x1f600 + i));

interface ControlMethods {
    open(i: number, content: React.ReactNode): void;
    close(): void;
}

function createViewerMethods(setState): ControlMethods {
    return {
        close: partial(setState, []),
        open(i, content) {
            setState([i, content]);
        },
    };
}

function useViewerSource(ref) {
    const [[i, content], {close}] =
        useControlSource<[number?, React.ReactNode?], ControlMethods>(ref, createViewerMethods, []);
    return {
        footer: <>第{i + 1}个</>,
        content,
        close,
    };
}

const Modal = forwardRef<ControlMethods, DrawerProps>(function Viewer(props, ref) {
    const {content, footer, close} = useViewerSource(ref);
    return (
        <AModal visible={!!content} footer={footer} onCancel={close} {...props}>
            {content}
        </AModal>
    );
});

const Drawer = forwardRef<ControlMethods, DrawerProps>(function Viewer(props, ref) {
    const {content, footer, close} = useViewerSource(ref);
    return (
        <ADrawer visible={!!content} footer={footer} onClose={close} {...props}>
            {content}
        </ADrawer>
    );
});


export default function Demo() {
    const typeProps = useInputValue('modal');
    const [MyViewer, {open: openViewer}] = useControl<ModalProps | DrawerProps, ControlMethods>(
        typeProps.value === 'modal' ? Modal : Drawer
    );
    const handleClick = i => openViewer(i, (
        <div style={{textAlign: 'center'}}>
            <div style={{fontSize: 120}}>{items[i]}</div>
            <p>0x{items[i].codePointAt(0)?.toString(16).toUpperCase()}</p>
        </div>
    ));

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
            <MyViewer title="Emoji Viewer" />
        </>
    );
}
