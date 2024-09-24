import {renderHook} from '@testing-library/react-hooks';
import useChunk from './useChunk';

describe('useChunk', () => {
    it('calculates chunks correctly', () => {
        const {result} = renderHook(() => useChunk([1, 2, 3, 4], 2));
        expect(result.current).toEqual([
            [1, 2],
            [3, 4]
        ]);
    });

    it('recomputes chunks only when inputs change', () => {
        const {result, rerender} = renderHook(({value, size}) => useChunk(value, size), {
            initialProps: {value: [1, 2, 3, 4], size: 2}
        });

        const initialChunks = result.current;
        rerender({value: [1, 2, 3, 4], size: 2});
        expect(result.current).toEqual(initialChunks);

        rerender({value: [1, 2, 3, 4, 5], size: 2});
        expect(result.current).not.toEqual(initialChunks);
    });

    it('handles empty arrays', () => {
        const {result} = renderHook(() => useChunk([], 3));
        expect(result.current).toEqual([]);
    });

    it('handles more chunks than elements', () => {
        const {result} = renderHook(() => useChunk([1, 2], 5));
        expect(result.current).toEqual([[1], [2]]);
    });

    it('handles size zero as size one', () => {
        const {result} = renderHook(() => useChunk([1, 2, 3, 4], 0));
        expect(result.current).toEqual([]);
    });

    it('ensures the last chunk has the remainder', () => {
        const {result} = renderHook(() => useChunk([1, 2, 3, 4, 5, 6, 7], 3));
        expect(result.current).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });
});
