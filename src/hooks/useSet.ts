import {useCallback, useState} from 'react';

type Actions<T> = {
    add: (item: T) => void;
    remove: (item: T) => void;
    has: (item: T) => boolean;
    set: (items: T[]) => void;
};

/**
 * Provides a React hook that manages a set of unique items. It returns the current set along with actions to manipulate the set.
 * This hook abstracts set operations like add, remove, check for existence, and reset, offering a simple interface to manage unique item collections.
 * Useful for managing selections, toggles, or any other collection of unique items.
 *
 * @template T - The type of items stored in the set.
 * @param {Set<T>} initialValue - Initial set of items.
 * @returns {[Set<T>, Actions<T>]} - The current set and a set of actions to manipulate the set.
 * @example
 *
 * const [mySet, { add, remove, has, set }] = useSet(new Set(['apple', 'banana']));
 *
 * add('orange'); // Adds 'orange' to the set
 * remove('banana'); // Removes 'banana' from the set
 * const isApplePresent = has('apple'); // Checks if 'apple' is in the set
 * set(['kiwi', 'grape']); // Resets the set with new items
 */
const useSet = <T>(initialValue = new Set<T>()): [Set<T>, Actions<T>] => {
    const [setItems, setSetItems] = useState(initialValue);

    const add = useCallback((item: T) => {
        setSetItems((prevSet) => {
            if (prevSet.has(item)) {
                return prevSet; // Return the original set if item is already included
            }
            return new Set([...prevSet, item]); // Create a new set including the new item
        });
    }, []);

    const remove = useCallback((item: T) => {
        setSetItems((prevSet) => {
            if (!prevSet.has(item)) {
                return prevSet; // Return the original set if item is not found
            }
            const newSet = new Set(prevSet);
            newSet.delete(item);
            return newSet; // Create a new set excluding the specified item
        });
    }, []);

    const set = useCallback((items: T[]) => {
        setSetItems(new Set(items)); // Create a new set with the provided items
    }, []);

    const has = useCallback(
        (item: T) => setItems.has(item), // Check if an item is in the current set
        [setItems]
    );

    return [setItems, {add, remove, set, has}];
};

export default useSet;
