export type ChunkResult<T> = Array<T[]>;

/**
 * Splits an array into a specified number of chunks.
 * The function divides the array into as many as `count` subarrays,
 * distributing the elements as evenly as possible. The last chunk
 * will carry the remainder if the array size isn't divisible by `count`.
 *
 * @param {T[]} value - The array to be chunked.
 * @param {number} count - The number of chunks to divide the array into.
 * @return {T[][]} - An array of chunks, where each chunk is an array containing a segment of the original array's elements.
 * @example
 *
 * chunk([1, 2, 3, 4], 2) // returns [[1, 2], [3, 4]]
 * chunk([1, 2, 3, 4, 5], 2) // returns [[1, 2, 3], [4, 5]]
 * chunk([1, 2, 3, 4], 5) // returns [[1], [2], [3], [4]]
 */
export const chunk = <T>(value: T[], count = 1): T[][] => {
    if (!Array.isArray(value) || value.length === 0) return [];

    count = Math.min(count, value.length);

    const chunkSize = Math.ceil(value.length / count);
    const chunks: T[][] = [];

    for (let i = 0; i < count; i++) {
        chunks.push(value.slice(i * chunkSize, (i + 1) * chunkSize));
    }

    return chunks;
};
