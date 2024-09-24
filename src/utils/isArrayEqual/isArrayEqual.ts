/**
 * Checks if two arrays are equal by comparing each element using Object.is().
 * The function returns true only if both arrays contain the same elements
 * in the same order and quantity, disregarding differences in element types
 * that are not distinguishable by Object.is().
 *
 * @param {T[]} a - The first array to compare.
 * @param {T[]} b - The second array to compare.
 * @return {boolean} - True if arrays are equal, false otherwise.
 * @example
 *
 * isArrayEqual([1, 2], [1, 2]) // returns true
 * isArrayEqual([1, 2], [2, 1]) // returns false
 */
export const isArrayEqual = <T>(a?: T[], b?: T[]): boolean => {
    if (!(Array.isArray(a) && Array.isArray(b))) {
        return false;
    }

    if (a.length !== b.length) {
        return false;
    }

    return a.every((item) => {
        return !!b.find((it) => Object.is(it, item));
    });
};
