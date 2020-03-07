import {renderHook} from '@testing-library/react-hooks';
import {useScrollLock} from '../index';

test('scroll lock', () => {
    renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');
});

test('no scroll lock', () => {
    renderHook(() => useScrollLock(false));
    expect(document.body.style.overflow).toBe('');
});

test('free lock on unmount', () => {
    const {unmount} = renderHook(() => useScrollLock(false));
    unmount();
    expect(document.body.style.overflow).toBe('');
});

test('return previous overflow', () => {
    document.body.style.overflow = 'visible';
    const {unmount} = renderHook(() => useScrollLock(false));
    unmount();
    expect(document.body.style.overflow).toBe('visible');
    document.body.style.overflow = '';
});

test('no revert when overflow is modified', () => {
    const {unmount} = renderHook(() => useScrollLock(false));
    document.body.style.overflow = 'visible';
    unmount();
    expect(document.body.style.overflow).toBe('visible');
    document.body.style.overflow = '';
});
