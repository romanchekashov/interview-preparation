const { Comparator } = require('../../Comparator');

/**
 * https://www.youtube.com/watch?v=-Yn5DU0_-lw&t=0s&ab_channel=WilliamFiset
 *
 * Single Linked List:
 *      Pros: Uses less memory, Simpler implementation
 *      Cons: Cannot easily access previous elements
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

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }

    toString(callback) {
        return callback ? callback(this.val) : `${this.val}`;
    }
}

/**
 * Single-linked list implementation
 */
class LinkedList {
    /**
     * @param {Function} [comparatorFunction]
     */
    constructor(comparatorFunction) {
        /** @var ListNode */
        this.head = null;

        /** @var ListNode */
        this.tail = null;

        this.compare = new Comparator(comparatorFunction);
    }

    /**
     * @param {*} val
     * @return {LinkedList}
     */
    prepend(val) {
        // Make new node to be a head.
        const newNode = new ListNode(val, this.head);
        this.head = newNode;

        // If there is no tail yet let's make new node a tail.
        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    /**
     * @param {*} val
     * @return {LinkedList}
     */
    append(val) {
        const newNode = new ListNode(val);

        // If there is no head yet let's make new node a head.
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        // Attach new node to the end of linked list.
        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    /**
     * @param {*} val
     * @param {number} rawIndex
     * @return {LinkedList}
     */
    insert(val, rawIndex) {
        const index = rawIndex < 0 ? 0 : rawIndex;
        if (index === 0) {
            this.prepend(val);
        } else {
            let count = 1;
            let currentNode = this.head;
            const newNode = new ListNode(val);
            while (currentNode) {
                if (count === index) break;
                currentNode = currentNode.next;
                count += 1;
            }
            if (currentNode) {
                newNode.next = currentNode.next;
                currentNode.next = newNode;
            } else {
                if (this.tail) {
                    this.tail.next = newNode;
                    this.tail = newNode;
                } else {
                    this.head = newNode;
                    this.tail = newNode;
                }
            }
        }
        return this;
    }

    /**
     * @param {*} val
     * @return {ListNode}
     */
    delete(val) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;

        // If the head must be deleted then make next node that is different
        // from the head to be a new head.
        while (this.head && this.compare.equal(this.head.val, val)) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            // If next node must be deleted then make next node to be a next next one.
            while (currentNode.next) {
                if (this.compare.equal(currentNode.next.val, val)) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // Check if tail must be deleted.
        if (this.compare.equal(this.tail.val, val)) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    /**
     * @param {Object} findParams
     * @param {*} findParams.val
     * @param {function} [findParams.callback]
     * @return {ListNode}
     */
    find({ val = undefined, callback = undefined }) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {
            // If callback is specified then try to find node by callback.
            if (callback && callback(currentNode.val)) {
                return currentNode;
            }

            // If val is specified then try to compare by val..
            if (val !== undefined && this.compare.equal(currentNode.val, val)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    /**
     * @return {ListNode}
     */
    deleteTail() {
        const deletedTail = this.tail;

        if (this.head === this.tail) {
            // There is only one node in linked list.
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        // If there are many nodes in linked list...

        // Rewind to the last node and delete "next" link for the node before the last one.
        let currentNode = this.head;
        while (currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;

        return deletedTail;
    }

    /**
     * @return {ListNode}
     */
    deleteHead() {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    /**
     * @param {*[]} vals - Array of vals that need to be converted to linked list.
     * @return {LinkedList}
     */
    fromArray(vals) {
        vals.forEach((val) => this.append(val));

        return this;
    }

    /**
     * @return {ListNode[]}
     */
    toArray() {
        const nodes = [];

        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
     * @param {function} [callback]
     * @return {string}
     */
    toString(callback) {
        return this.toArray().map((node) => node.toString(callback)).toString();
    }

    /**
     * Reverse a linked list.
     * @returns {LinkedList}
     */
    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currNode) {
            // Store next node.
            nextNode = currNode.next;

            // Change next node of the current node so it would link to previous node.
            currNode.next = prevNode;

            // Move prevNode and currNode nodes one step forward.
            prevNode = currNode;
            currNode = nextNode;
        }

        // Reset head and tail.
        this.tail = this.head;
        this.head = prevNode;

        return this;
    }

    *[Symbol.iterator]() {
        /*
         * The `current` variable is used to iterate over the list nodes.
         * It starts out pointing to the head and is overwritten inside
         * of the loop below.
         */
        let current = this.head;

        /*
         * As long as `current` is not `null`, there is a piece of data
         * to yield.
         */
        while (current) {
            yield current.val;
            current = current.next;
        }
    }
}

module.exports = { LinkedList, ListNode };
