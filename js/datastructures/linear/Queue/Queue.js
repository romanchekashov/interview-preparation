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
 * Remove(Dequeue)   O(1)
 * Peeking           O(1)
 * Is Empty          O(1)
 * Search            O(n)
 * Access            O(n)
 * Contains          O(n)
 * Removal           O(n)
 *
 */

class Queue {
    enqueue(item){};
    dequeue(){};
    size(){};
    clear(){};
    isEmpty(){};
}

module.exports = { Queue };
