/**
 * A stack uses LIFO (last-in first-out) ordering. That is, as in a stack of
 * dinner plates, the most recent item added to the stack is the first item to
 * be removed.
 *
 * Note that a stack can also be implemented using a linked list, if items were
 * added and removed from the same side.
 *
 * A stack can also be used to implement a recursive algorithm iteratively.
 *
 * Complexity Analysis:
 *         Stack
 * Search   O(n)
 * Access   O(n)
 * Insert   O(1)
 * Remove   O(1)
 */

class StackNode {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}

class Stack {
    top = null; // StackNode
    size = 0;

    // return if the stack is empty
    isEmpty() {
        return this.size === 0;
    }

    // push the element on the stack
    push(elem) {
        this.top = new StackNode(elem, this.top);
        this.size++;
    }

    // pop the element off the stack
    pop() {
        if (this.isEmpty()) throw new Error('EmptyStackException');
        const item = this.top.data;
        this.top = this.top.next;
        this.size--;
        return item;
    }

    peek() {
        if (this.isEmpty()) throw new Error('EmptyStackException');
        return this.top.data;
    }
}

module.exports = { Stack };
