const { Queue } = require('./Queue')

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
 * In this implementation, the 'Queue' class is defined with a 'head' and 'tail' pointer, which are initialized to 'null' to indicate an empty queue,
 * and a 'count' to track the number of elements in the queue.
 * The 'Node' class is defined to create the individual nodes that make up the linked list.
 *
 * The 'enqueue' method adds a new item to the end of the linked list by creating a new node with the item's value
 * and appending it to the end of the list by updating the 'tail' pointer.
 * If the list is empty, the 'head' pointer is also updated to the new node. The 'count' is incremented to track the number of items in the queue.
 *
 * The 'dequeue' method removes and returns the item at the front of the queue by retrieving the value of the 'head' node,
 * updating the 'head' pointer to the next node in the list, and decrementing the 'count'. If the list becomes empty, the 'tail' pointer is set to 'null'.
 *
 * The 'isEmpty', 'size', and 'clear' methods provide additional functionality for working with the queue.
 *
 * Note that in a linked list implementation, the 'enqueue' method does not have a limit on the maximum size of the queue,
 * so it can grow as large as the available memory allows.
 */
class QueueLinkedList extends Queue {
    constructor() {
        super();
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    enqueue(item) {
        const node = new Node(item);
        if (this.isEmpty()) {
            this.head = node;
        } else {
            this.tail.next = node;
        }
        this.tail = node;
        this.count++;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        const item = this.head.value;
        this.head = this.head.next;
        this.count--;
        if (this.isEmpty()) {
            this.tail = null;
        }
        return item;
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }
}

module.exports = { QueueLinkedList, Node };
