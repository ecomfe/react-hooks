import {useCallback} from 'react';
import {useCounter} from '@huse/number';
import {useSlot, SlotProps} from '@huse/slot';

const emojis = Array.from({length: 10}, (_, i) => String.fromCodePoint(0x1f600 + i));

export default () => {
    const [i, {increment, decrement}] = useCounter(5, {min: 0, max: emojis.length - 1});

    const Buttons = useCallback(function ({code}) {
        return <p>
            <button disabled={i < 1} onClick={decrement}>Prev</button>
            <span style={{margin: '0 2em'}}>0x{code.toString(16).toUpperCase()}</span>
            <button disabled={i > emojis.length - 2} onClick={increment}>Next</button>
        </p>;
    }, [i, increment, decrement]);

    return <div>
        <Emoji content={emojis[i]} renderBefore={`第${i + 1}个`} renderAfter={Buttons} />
    </div>
};

function Emoji(props: {content: string} & SlotProps<'before' | 'content' | 'after'>) {
    const {content} = props;
    const Slot = useSlot<'before' | 'content' | 'after', typeof props>(props);
    const code = content.codePointAt(0);
    return <div style={{textAlign: 'center'}}>
        <Slot name="before" code={code} />
        <h1 style={{fontSize: 66}}>
            <Slot name="content">{content}</Slot>
        </h1>
        <Slot name="after" code={code} />
    </div>
}
