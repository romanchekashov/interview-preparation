/**
 * A queue implements FIFO (first-in first-out) ordering. As in a line or queue
 * at a ticket stand, items are removed from the data structure in the same
 * order that they are added.
 *
 * A queue can also be implemented with a linked list. In fact, they are
 * essentially the same thing, as long as items are added and removed from
 * opposite sides.
 *
 * Complexity Analysis:
 *                  Queue
 * Insert(Enqueue)   O(1)
 * Remove(Deque)   O(1)
 * Peeking           O(1)
 * Is Empty          O(1)
 * Search            O(n)
 * Access            O(n)
 * Contains          O(n)
 * Removal           O(n)
 *
 */

class Queue {
    /**
     * @param item adding an element to the end | O(1) time
     */
    enqueue(item){};

    /**
     * @return removing the first element | O(1) time
     */
    dequeue(){};

    size(){};

    clear(){};

    isEmpty(){};
}

module.exports = { Queue };
