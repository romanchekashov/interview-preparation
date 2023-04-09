/**
 * In this implementation, the Deque class is defined with an array items to store the dequeue elements.
 * The addFront method adds an item to the front of the dequeue by using the unshift method to add the item to the beginning of the array.
 * The addRear method adds an item to the rear of the dequeue by using the push method to add the item to the end of the array.
 * The removeFront method removes and returns the item at the front of the dequeue by using the shift method to remove the first element of the array.
 * The removeRear method removes and returns the item at the rear of the dequeue by using the pop method to remove the last element of the array.
 * The isEmpty, size, peekFront, peekRear, and clear methods provide additional functionality for working with the dequeue.
 *
 * This implementation is simple and easy to understand, but keep in mind that it may not be the most efficient for larger deques,
 * as the 'shift' and 'unshift' methods have a time complexity of O(n) since they require shifting all the remaining elements of the array.
 * For larger deques, a circular buffer or linked list may be a better choice.
 */
class DequeArray {
    constructor() {
        this.items = [];
    }

    addFront(item) {
        this.items.unshift(item);
    }

    addRear(item) {
        this.items.push(item);
    }

    removeFront() {
        return this.items.shift();
    }

    removeRear() {
        return this.items.pop();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    peekFront() {
        return this.items[0];
    }

    peekRear() {
        return this.items[this.items.length - 1];
    }

    clear() {
        this.items = [];
    }
}

module.exports = { DequeArray };
