/**
 * https://www.youtube.com/watch?v=-Yn5DU0_-lw&t=0s&ab_channel=WilliamFiset
 *
 * Single Linked List:
 *      Pros: Uses less memory, Simpler implementation
 *      Cons: Cannot easile access previous elements
 *
 * Doubly Linked List:
 *      Pros: Can be traversed backwards
 *      Cons: Takes 2x memory
 *
 * Complexity Analysis:
 *                  Single Linked   |   Doubly Linked
 * Search               O(n)                O(n)
 * Insert at head       O(1)                O(1)
 * Insert at tail       O(1)                O(1)
 * Remove at head       O(1)                O(1)
 * Remove at tail       O(n)                O(1)      <-- different
 * Remove in middle     O(n)                O(n)
 *
 */

class LinkedListNode {
    constructor(element, prev, next) {
        this.element = element;
        this.prev = prev;
        this.next = next;
    }
}

/**
 * Doubly-linked list implementation
 */
class LinkedList {
    size = 0;
    first = null; // first list element
    last = null; // last list element

    // Empty this linked list, O(n)
    clear() {
        let trav = this.first;
        while (trav !== null) {
            const next = trav.next;
            trav.prev = trav.next = null;
            trav.element = null;
            trav = next;
        }
        this.first = this.last = trav = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    // Add an element to the tail of the linked list, O(1)
    add(elem) {
        this.addLast(elem);
    }

    // Add a node to the tail of the linked list, O(1)
    addLast(elem) {
        if (this.isEmpty()) {
            this.first = this.last = new LinkedListNode(elem, null, null);
        } else {
            this.last.next = new LinkedListNode(elem, this.last, null);
            this.last = this.last.next;
        }
        this.size++;
    }

    // Add an element to the beginning of this linked list, O(1)
    addFirst(elem) {
        if (this.isEmpty()) {
            this.first = this.last = new LinkedListNode(elem, null, null);
        } else {
            this.first.prev = new LinkedListNode(elem, null, this.first);
            this.first = this.first.prev;
        }
        this.size++;
    }

    // Add an element at a specified index
    addAt(index, data) {
        if (index < 0) {
            throw new Error('Illegal Index');
        }
        if (index === 0) {
            this.addFirst(data);
            return;
        }

        if (index === size) {
            this.addLast(data);
            return;
        }

        let temp = this.first;
        for (let i = 0; i < index - 1; i++) {
            temp = temp.next;
        }
        const newNode = new LinkedListNode(data, temp, temp.next);
        temp.next.prev = newNode;
        temp.next = newNode;

        this.size++;
    }

    // Check the value of the first node if it exists, O(1)
    peekFirst() {
        if (this.isEmpty()) throw new Error('Empty list');
        return this.first.element;
    }

    // Check the value of the last node if it exists, O(1)
    peekLast() {
        if (this.isEmpty()) throw new Error('Empty list');
        return this.last.element;
    }

    // Remove the first value at the head of the linked list, O(1)
    removeFirst() {
        // Can't remove data from an empty list
        if (this.isEmpty()) throw new Error('Empty list');

        // Extract the data at the head and move
        // the head pointer forwards one node
        const data = this.first.element;
        this.first = this.first.next;
        --this.size;

        if (this.isEmpty()) {
            this.last = null; // If the list is empty set the tail to null
        } else {
            this.first.prev = null; // Do a memory cleanup of the previous node
        }

        // Return the data that was at the first node we just removed
        return data;
    }

    // Remove the last value at the tail of the linked list, O(1)
    removeLast() {
        // Can't remove data from an empty list
        if (this.isEmpty()) throw new Error('Empty list');

        // Extract the data at the tail and move
        // the tail pointer backwards one node
        const data = this.last.data;
        this.last = this.last.prev;
        --this.size;

        if (this.isEmpty()) {
            this.first = null; // If the list is now empty set the head to null
        } else {
            this.last.next = null; // Do a memory clean of the node that was just removed
        }

        // Return the data that was in the last node we just removed
        return data;
    }

    // Remove an arbitrary node from the linked list, O(1)
    #remove(node) {
        // If the node to remove is somewhere either at the
        // head or the tail handle those independently
        if (node.prev === null) return this.removeFirst();
        if (node.next === null) return this.removeLast();

        // Make the pointers of adjacent nodes skip over 'node'
        node.next.prev = node.prev;
        node.prev.next = node.next;

        // Temporarily store the data we want to return
        const data = node.element;

        // Memory cleanup
        node.element = null;
        node = node.prev = node.next = null;

        --this.size;

        // Return the data in the node we just removed
        return data;
    }

    // Remove a node at a particular index, O(n)
    removeAt(index) {
        // Make sure the index provided is valid
        if (index < 0 || index >= this.size) {
            throw new Error('IllegalArgumentException');
        }

        let i;
        let trav;

        if (index < this.size / 2) {
            // Search from the front of the list
            for (i = 0, trav = this.first; i !== index; i++) {
                trav = trav.next;
            }
        } else {
            // Search from the back of the list
            for (i = size - 1, trav = this.last; i !== index; i--) {
                trav = trav.prev;
            }
        }

        return this.#remove(trav);
    }

    // Remove a particular value in the linked list, O(n)
    remove(obj) {
        let trav = this.first;

        if (obj === null) {
            // Support searching for null
            for (trav = this.first; trav !== null; trav = trav.next) {
                if (trav.data === null) {
                    this.#remove(trav);
                    return true;
                }
            }
        } else {
            // Search for non null object
            for (trav = this.first; trav !== null; trav = trav.next) {
                if (obj === trav.data) {
                    this.#remove(trav);
                    return true;
                }
            }
        }
        return false;
    }

    // Find the index of a particular value in the linked list, O(n)
    indexOf(obj) {
        let index = 0;
        let trav = this.first;

        if (obj === null) {
            // Support searching for null
            for (; trav !== null; trav = trav.next, index++) {
                if (trav.data === null) {
                    return index;
                }
            }
        } else {
            // Search for non null object
            for (; trav !== null; trav = trav.next, index++) {
                if (obj === trav.data) {
                    return index;
                }
            }
        }

        return -1;
    }

    // Check is a value is contained within the linked list
    contains(obj) {
        return this.indexOf(obj) !== -1;
    }

    *[Symbol.iterator]() {
        /*
         * The `current` variable is used to iterate over the list nodes.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this.first;

        /*
         * As long as `current` is not `null`, there is a piece of data
         * to yield.
         */
        while (current) {
            yield current.element;
            current = current.next;
        }
    }
}

module.exports = { LinkedList };
