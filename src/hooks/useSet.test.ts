import {renderHook, act} from '@testing-library/react-hooks';
import useSet from './useSet';

describe('useSet', () => {
    it('initializes with empty set if no initial value provided', () => {
        const {result} = renderHook(() => useSet());
        expect(result.current[0]).toEqual(new Set());
    });

    it('initializes with provided initial values', () => {
        const initialValue = new Set([1, 2, 3]);
        const {result} = renderHook(() => useSet(initialValue));
        expect(result.current[0]).toEqual(new Set([1, 2, 3]));
    });

    it('adds items to the set', () => {
        const {result} = renderHook(() => useSet());
        act(() => {
            result.current[1].add(1);
            result.current[1].add(2);
        });
        expect(result.current[0]).toEqual(new Set([1, 2]));
    });

    it('removes items from the set', () => {
        const initialValue = new Set([1, 2, 3]);
        const {result} = renderHook(() => useSet(initialValue));
        act(() => {
            result.current[1].remove(2);
        });
        expect(result.current[0]).toEqual(new Set([1, 3]));
    });

    it('checks if an item is in the set', () => {
        const initialValue = new Set([1, 2, 3]);
        const {result} = renderHook(() => useSet(initialValue));
        expect(result.current[1].has(2)).toBe(true);
        expect(result.current[1].has(4)).toBe(false);
    });

    it('sets new items to the set', () => {
        const {result} = renderHook(() => useSet());
        act(() => {
            result.current[1].set([3, 4, 5]);
        });
        expect(result.current[0]).toEqual(new Set([3, 4, 5]));
    });

    it('handles multiple actions correctly', () => {
        const {result} = renderHook(() => useSet());
        act(() => {
            result.current[1].add(1);
            result.current[1].add(2);
            result.current[1].remove(1);
            result.current[1].set([4, 5]);
        });
        expect(result.current[0]).toEqual(new Set([4, 5]));
    });
});
