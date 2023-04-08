const { Queue } = require('./Queue')

/**
 * In this implementation, the 'Queue' class is defined with an array 'items' to store the queue elements.
 * The 'enqueue' method adds an item to the back of the queue by using the 'push' method to add the item to the end of the array.
 * The 'dequeue' method removes and returns the item at the front of the queue by using the 'shift' method to remove the first element of the array.
 * The 'isEmpty', 'size', 'front', and 'clear' methods provide additional functionality for working with the queue.
 *
 * This implementation is simple and easy to understand, but keep in mind that it may not be the most efficient for larger queues,
 * as the 'shift' method has a time complexity of O(n) since it requires shifting all the remaining elements of the array.
 * For larger queues, a circular buffer or linked list may be a better choice.
 */
class QueueArray extends Queue {
    constructor() {
        super();
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    front() {
        return this.items[0];
    }

    clear() {
        this.items = [];
    }
}

module.exports = { QueueArray };
