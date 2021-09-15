import {useEffect, useMemo} from 'react';

interface Options {
    code?: string;
    key?: string;
    /**
     * 严格模式仅在用户按下严格的快捷键时生效，不会在用户按下更复杂的组合键时生效。如 strict 模式下的 ⌘C 不会响应 ⌥⌘C，但非 strict 模式会
     */
    strict?: boolean;
    repeat?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    metaKey?: boolean;
    keydown?: (e: KeyboardEvent) => void;
    keyup?: (e: KeyboardEvent) => void;
}

type ComposingKey = 'ctrlKey' | 'shiftKey' | 'altKey' | 'metaKey';
type ComposingKeys = ComposingKey[];

const composingKeys: ComposingKeys = ['ctrlKey', 'shiftKey', 'altKey', 'metaKey'];

// trigger e.repeat === false by default, trigger all when options.repeat === true
const isRepeatMatched = (e: KeyboardEvent, options: Options) => {
    if (options.repeat === true) {
        return true;
    }
    return !e.repeat;
};

const isComposingMatched = (e: KeyboardEvent, options: Options) => {
    if (options.strict) {
        // check both truthy and falsy
        return (
            Boolean(e.ctrlKey) === Boolean(options.ctrlKey)
            && Boolean(e.shiftKey) === Boolean(options.shiftKey)
            && Boolean(e.altKey) === Boolean(options.altKey)
            && Boolean(e.metaKey) === Boolean(options.metaKey)
        );
    }
    // not strict
    const keys = composingKeys.filter(
        key => options[key] !== undefined
    );

    for (const key of keys) {
        if (e[key] !== options[key]) {
            return false;
        }
    }
    return true;
};

const isKeyMatched = (e: KeyboardEvent, options: Options) => {
    if (e.code === options.code) {
        return true;
    }
    if (e.key === options.key) {
        return true;
    }
    if (options.code === undefined && options.key === undefined) {
        return true;
    }
    return false;
};

/**
 * 判断元素是否为表单元素
 * @see https://github.com/github/hotkey/blob/main/src/utils.ts#L1
 */
const isFormField = (element: Node) => {
    if (!(element instanceof HTMLElement)) {
        return false;
    }

    const name = element.nodeName.toLowerCase();
    const type = (element.getAttribute('type') || '').toLowerCase();
    return (
        name === 'select'
        || name === 'textarea'
        || (name === 'input' && type !== 'submit' && type !== 'reset' && type !== 'checkbox' && type !== 'radio')
        || element.isContentEditable
    );
};

const isMatched = (e: KeyboardEvent, options: Options) => {
    return (
        !isFormField(e.target as HTMLElement)
        && isKeyMatched(e, options)
        && isComposingMatched(e, options)
        && isRepeatMatched(e, options)
    );
};

const createHotKeyHook = () => {
    const optionList: Options[] = [];
    const onDocumentKeydown = (e: KeyboardEvent) => {
        // 是否需要一个参数来定义是否需要 prevent
        // e.preventDefault();
        optionList.forEach(options => {
            const {keydown} = options;
            if (!keydown) {
                return;
            }
            if (isMatched(e, options)) {
                keydown(e);
            }
        });
    };
    const onDocumentKeyup = (e: KeyboardEvent) => {
        // 是否需要一个参数来定义是否需要 prevent
        // e.preventDefault();
        optionList.forEach(options => {
            const {keyup} = options;
            if (!keyup) {
                return;
            }
            /**
             * @see https://cloud.tencent.com/developer/ask/70262
             */
            if (e.key === 'Meta') {
                keyup(e);
            } else if (isMatched(e, options)) {
                keyup(e);
            }
        });
    };
    const useHotKey = (options: Options) => {
        const memoizedOptions = useMemo(
            () => options,
            // eslint-disable-next-line react-hooks/exhaustive-deps
            Object.values(options)
        );
        useEffect(
            () => {
                optionList.push(memoizedOptions);
                return () => {
                    optionList.splice(optionList.indexOf(memoizedOptions), 1);
                };
            },
            [memoizedOptions]
        );
    };
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('keyup', onDocumentKeyup);
    return useHotKey;
};

/**
 * 快捷键 hook
 * @see https://codesandbox.io/s/usehotkey-k83fb
 */
export const useHotKey = createHotKeyHook();
