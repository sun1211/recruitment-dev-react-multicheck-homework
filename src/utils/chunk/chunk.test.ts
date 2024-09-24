import {chunk} from './chunk';

describe('chunk', () => {
    it('splits an array into specified chunks', () => {
        expect(chunk([1, 2, 3, 4], 2)).toEqual([
            [1, 2],
            [3, 4]
        ]);
        expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([
            [1, 2, 3],
            [4, 5]
        ]);
    });

    it('handles a single chunk', () => {
        expect(chunk([1, 2, 3, 4], 1)).toEqual([[1, 2, 3, 4]]);
    });

    it('returns an empty array when the input is empty', () => {
        expect(chunk([], 3)).toEqual([]);
    });

    it('handles more chunks than elements', () => {
        expect(chunk([1, 2], 5)).toEqual([[1], [2]]);
    });

    it('distributes elements evenly', () => {
        expect(chunk([1, 2, 3, 4, 5, 6], 3)).toEqual([
            [1, 2],
            [3, 4],
            [5, 6]
        ]);
    });

    it('returns each item in its own chunk when count equals the array length', () => {
        expect(chunk([1, 2, 3, 4], 4)).toEqual([[1], [2], [3], [4]]);
    });

    it("ensures the last chunk has the remainder if the array size isn't divisible by count", () => {
        expect(chunk([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });
});
