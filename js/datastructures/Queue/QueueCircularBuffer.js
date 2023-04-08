const { Queue } = require('./Queue')

/**
 * A circular buffer can be an efficient way to implement a queue in JavaScript
 * because it avoids the need to shift elements when adding or removing elements from the front of the queue.
 *
 * In this implementation, the 'Queue' class is defined with an array 'items' to store the queue elements,
 * along with 'maxSize' to define the maximum size of the queue, 'front' and 'rear' to track the front
 * and rear positions of the queue, and 'count' to track the number of elements in the queue.
 * The 'enqueue' method adds an item to the rear of the queue by placing it in the 'items' array at the position indicated by 'rear'
 * and incrementing 'rear' to the next circular position using the modulus operator.
 * The 'dequeue' method removes and returns the item at the front of the queue by retrieving it from the 'items' array
 * at the position indicated by 'front' and incrementing 'front' to the next circular position using the modulus operator.
 * The 'isEmpty', 'isFull', 'size', and 'clear' methods provide additional functionality for working with the queue.
 *
 * Note that the 'enqueue' and 'dequeue' methods throw an error if the queue is full or empty, respectively.
 * This is a common convention in circular buffer implementations, but you could modify the code to handle these conditions differently if desired.
 */
class QueueCircularBuffer extends Queue {
    constructor(size) {
        super();
        this.items = new Array(size);
        this.maxSize = size;
        this.front = 0;
        this.rear = 0;
        this.count = 0;
    }

    enqueue(item) {
        if (this.count === this.maxSize) {
            throw new Error('Queue is full');
        }
        this.items[this.rear] = item;
        this.rear = (this.rear + 1) % this.maxSize;
        this.count++;
    }

    dequeue() {
        if (this.count === 0) {
            throw new Error('Queue is empty');
        }
        const item = this.items[this.front];
        this.front = (this.front + 1) % this.maxSize;
        this.count--;
        return item;
    }

    isEmpty() {
        return this.count === 0;
    }

    isFull() {
        return this.count === this.maxSize;
    }

    size() {
        return this.count;
    }

    clear() {
        this.items = new Array(this.maxSize);
        this.front = 0;
        this.rear = 0;
        this.count = 0;
    }
}

module.exports = { QueueCircularBuffer };
