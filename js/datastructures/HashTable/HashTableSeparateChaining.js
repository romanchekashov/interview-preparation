class HashCode {
    static calc(key) {
        if (key === undefined || key === null) return 0;
        if (typeof key === 'number') return Math.floor(key);
        if (typeof key === 'string') return HashCode.#stringHashCode(key);
        throw new Error('hashCode not implemented for: ' + key);
    }

    static #stringHashCode(key) {
        let result = 0;

        // Iterate over each character (not each byte) in the string
        for (const character of key) {
            /*
             * The `codePointAt()` method has support for multi-byte characters,
             * so that's better than `charCodeAt()` for this purpose.
             *
             * `character` is a single-character string, so we only want the code
             * point at position 0.
             */
            result += character.codePointAt(0);
        }

        return result;
    }
}

class Entry {
    constructor(key, value, next) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

/*
 * These symbols are used to represent properties that should not be part of
 * the public interface. You could also use ES2019 private fields, but those
 * are not yet widely available as of the time of my writing.
 */
const table = Symbol('table');

/**
 * An implementation of a hash-table using separate chaining with a linked list.
 * Instead of using LinkedList itself just use some rules of it for Entry.
 *
 * In this simple implementation, we use an array of linked lists and a hash code function.
 *
 * NOTE:
 * Alternatively, we can implement the hash table with a balanced binary search tree.
 * This gives us an O(log N) lookup time. The advantage of this is potentially
 * using less space, since we no longer allocate a large array.
 * We can also iterate through the keys in order, which can be useful sometimes.
 */
class HashTableSeparateChaining {
    constructor(size) {
        this[table] = new Array(size);
    }

    /**
     * To insert a key (which might be a string or essentially any other data type)
     * and value, we do the following:
     *
     * 1 - First, compute the key's hash code, which will usually be an int or long.
     * Note that two different keys could have the same hash code, as there may be
     * an infinite number of keys and a finite number of ints.
     *
     * 2 - Then, map the hash code to an index in the array. This could be done
     * with something like hash (key) % array_length. Two different hash codes could,
     * of course, map to the same index.
     *
     * 3 - At this index, there is a linked list of keys and values. Store the key and value
     * in this index. We must use a linked list because of collisions:
     * you could have two different keys with the same hash code,
     * or two different hash codes that map to the same index.
     *
     * @param {*} key
     */
    set(key, value) {
        const hashIndex = this.#hashToIndex(key);
        if (this[table][hashIndex]) {
            let entry = this.#getEntry(key);
            if (entry) {
                entry.value = value;
            } else {
                this[table][hashIndex].next = new Entry(key, value);
            }
        } else {
            this[table][hashIndex] = new Entry(key, value);
        }
    }

    /**
     * To retrieve the value pair by its key, you repeat this process.
     * Compute the hash code from the key, and then compute the index from the hash code.
     * Then, search through the linked list for the value with this key.
     *
     * If the number of collisions is very high, the worst case runtime is O(N),
     * where N is the number of keys. However, we generally assume a good implementation
     * that keeps collisions to a minimum, in which case the lookup time is 0(1).
     *
     * @param {*} key
     */
    get(key) {
        let entry = this.#getEntry(key);
        return entry?.value;
    }

    has(key) {
        return !!this.#getEntry(key);
    }

    // O(1) in worst case O(n), n - number of dupli
    delete(key) {
        const hash = this.#hashToIndex(key);
        let entry = this[table][hash];
        let prevEntry;

        while (entry) {
            if (entry.key === key) {
                if (prevEntry) {
                    prevEntry.next = entry.next;
                } else {
                    this[table][hash] = entry.next;
                }
                return true;
            }

            prevEntry = entry;
            entry = entry.next;
        }
        return false;
    }

    clear() {
        this[table] = new Array(this[table].length);
    }

    #hashToIndex(key) {
        return HashCode.calc(key) % this[table].length;
    }

    #getEntry(key) {
        let entry = this[table][this.#hashToIndex(key)];
        while (entry) {
            if (entry.key === key) return entry;
            entry = entry.next;
        }
        return undefined;
    }

    /**
     * The default iterator for the class.
     * @returns {Iterator} An iterator for the class.
     */
    [Symbol.iterator]() {
        return this.entries();
    }

    /**
     * Create an iterator that returns each entry in the hash map.
     * @returns {Iterator} An iterator on the hash map.
     */
    *entries() {
        // For each item in the array
        for (let entry of this[table]) {
            // If there is no linked list then no need to go any further
            if (entry) {
                // If there is a linked list then yield each key-value pair
                while (entry) {
                    yield [entry.key, entry.value];
                    entry = entry.next;
                }
            }
        }
    }
}

module.exports = { HashTableSeparateChaining };
