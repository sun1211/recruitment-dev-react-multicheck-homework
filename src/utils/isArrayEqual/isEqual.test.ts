import {isArrayEqual} from './isArrayEqual';

describe('isArrayEqual', () => {
    test('returns true for two identical arrays', () => {
        const array1: number[] = [1, 2, 3];
        const array2: number[] = [1, 2, 3];
        expect(isArrayEqual(array1, array2)).toBe(true);
    });

    test('returns true for arrays with different orders', () => {
        const array1: number[] = [1, 2, 3];
        const array2: number[] = [3, 2, 1];
        expect(isArrayEqual(array1, array2)).toBe(true);
    });

    test('returns false for arrays of different lengths', () => {
        const array1: number[] = [1, 2, 3];
        const array2: number[] = [1, 2, 3, 4];
        expect(isArrayEqual(array1, array2)).toBe(false);
    });

    test('returns true for two empty arrays', () => {
        const array1: any[] = [];
        const array2: any[] = [];
        expect(isArrayEqual(array1, array2)).toBe(true);
    });

    test('returns false when either array is undefined', () => {
        const array1: number[] = [1, 2, 3];
        const array2 = undefined;
        expect(isArrayEqual(array1, array2)).toBe(false);
        expect(isArrayEqual(array2, array1)).toBe(false);
        expect(isArrayEqual(array2, array2)).toBe(false);
    });

    test('returns false when either input is not an array', () => {
        const array1: number[] = [1, 2, 3];
        const notAnArray: object = {0: 1, 1: 2, 2: 3};
        expect(isArrayEqual(array1, notAnArray as any)).toBe(false);
        expect(isArrayEqual(notAnArray as any, array1)).toBe(false);
    });

    test('returns true for arrays with identical objects', () => {
        const object1: {key: string} = {key: 'value'};
        const array1: object[] = [object1];
        const array2: object[] = [object1];
        expect(isArrayEqual(array1, array2)).toBe(true);
    });

    test('returns false for arrays with similar but not identical objects', () => {
        const object1: {key: string} = {key: 'value'};
        const object2: {key: string} = {key: 'value'};
        const array1: object[] = [object1];
        const array2: object[] = [object2];
        expect(isArrayEqual(array1, array2)).toBe(false);
    });
});
