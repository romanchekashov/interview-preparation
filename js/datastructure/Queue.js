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

class QueueNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    first = null;
    last = null;
    size = 0;

    // Add an element to the back of the queue
    offer(elem) {
        let t = new QueueNode(elem);
        if (this.last) {
            this.last.next = t;
        }
        this.last = t;
        if (!this.first) {
            this.first = this.last;
        }
        this.size++;
    }

    // Poll an element from the front of the queue
    // The method throws an error is the queue is empty
    poll() {
        if (this.isEmpty()) throw new Error('NoSuchElementException');
        const data = this.first.data;
        this.first = this.first.next;
        if (!this.first) {
            this.last = null;
        }
        this.size--;
        return data;
    }

    peek() {
        if (this.isEmpty()) throw new Error('NoSuchElementException');
        return this.first.data;
    }

    isEmpty() {
        return this.size === 0;
    }
}

module.exports = { Queue };
