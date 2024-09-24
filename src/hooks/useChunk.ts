import {useMemo} from 'react';
import {chunk, ChunkResult} from '../utils/chunk/chunk';

/**
 * A custom React hook that leverages useMemo to efficiently chunk an array into smaller arrays of a specified size.
 * This hook ensures that the chunking operation is only re-computed when either the input array or the size of the chunks changes.
 * It's particularly useful for breaking down large datasets into more manageable segments for rendering or processing.
 *
 * @template T - The type of elements contained in the input array.
 * @param {T[]} value - The array to be chunked.
 * @param {number} size - The desired number of elements in each chunk. If the array can't be evenly divided, the last chunk will contain the remaining elements.
 * @returns {ChunkResult<T>} - An array of chunks, where each chunk is a sub-array of the original array containing no more than 'size' elements.
 * @example
 *
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
 * const chunkSize = 3;
 * const chunks = useChunk(numbers, chunkSize);
 * // chunks would be [[1, 2, 3], [4, 5, 6], [7, 8]]
 */
const useChunk = <T>(value: T[] = [], size = 1): ChunkResult<T> => {
    // Use useMemo to only re-calculate chunks when `value` or `size` changes
    const chunks = useMemo(() => {
        return chunk(value, size);
    }, [value, size]);

    return chunks;
};

export default useChunk;
