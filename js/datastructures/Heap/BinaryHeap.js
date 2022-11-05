/**
 * A HEAP is a TREE based DS that satisfies the HEAP INVARIANT (also called heap property):
 * If A is a parent node of B then A is ordered with respect to B for all nodes A, B in the heap.
 *       8   <-- Root of tree -->   0
 *   7       6                  2       3
 * 3   2   5                  4   5   6   4
 *    Max Heap                   Min Heap
 *
 * Turning Min PQ into Max PQ:
 * Problem: Often the standard library of most programming languages only provide a min PQ
 * which sorts by smallest elements first, but sometimes we need a Max PQ.
 * Since elements in a priority queue are comparable they implement some sort of
 * COMPARABLE INTERFACE which we can simply NEGATE to achive a Max heap.
 *
 * A BINARY HEAP is a BINARY TREE that supports the HEAP INVARIANT.
 * In a binary tree every node has exactly two children.
 *
 * A COMPLETE BINARY TREE is a tree in which at every level, except possible the last
 * is completely filled and all the nodes are as far left as possible.
 * A COMPLETE BINARY TREE is totally filled other than the rightmost elements on the last level.
 *
 * IMPORTANT: A binary heap is a binary tree with these characteristics:
 * 1 - It's complete. This means it’s completely filled in, reading from left to right
 * across each row, although the last row need not be full.
 * 2 - It's (usually) implemented as an array.
 * 3 - Each node in a heap satisfies the heap condition (heap invariant), which states that
 * every node’s key is larger(smaller) than (or equal to) the keys of its children.
 *
 * Zero based Binary Heap Representation:
 * [9, 8, 7, 6, 5, 1]                       9
 * [0, 1, 2, 3, 4, 5]               8               7
 * Parent node index: i         6       5       1
 * Left child index:  2*i + 1
 * Right child index: 2*i + 2
 *
 * Min-heap is a complete binary tree where each node is smaller than its children.
 * The root, therefore, is the minimum element in the tree.
 *
 * Max-heap is a complete binary tree where each node is larger than its children.
 * The root, therefore, is the maximum element in the tree.
 *
 * PS: For duplicate values use additional DS Set or TreeSet to hold positions in heap.
 *
 * Complexity Analysis:
 * Remove       O(n)    can be O(log(n)) if search using a HASHTABLE
 * Poll         O(log(n))
 */

/**
 * Min-heap is a complete binary tree where each node is smaller than its children.
 * The root, therefore, is the minimum element in the tree.
 *
 * We have two key operations on a min-heap: insert and extract_min.
 */

/**
 * A min priority queue implementation using a binary heap.
 */
class BinaryHeap {
    _heap = [];

    #isEmpty = () => this._heap.length === 0;

    #parentIndex = (index) => Math.floor((index - 1) / 2);

    #leftChildIndex = (index) => 2 * index + 1;

    #rightChildIndex = (index) => 2 * index + 2;

    // Tests if the value of node i <= node j
    #less = (i, j) => this._heap[i] <= this._heap[j];

    #swap = (i, j) => {
        const temp = this._heap[i];
        this._heap[i] = this._heap[j];
        this._heap[j] = temp;
    };

    /**
     * Perform bottom up node sift, O(log(n))
     * @param {*} index
     */
    #siftUp(index) {
        let parent = this.#parentIndex(index);

        while (index > 0 && this.#less(index, parent)) {
            this.#swap(parent, index);
            index = parent;
            parent = this.#parentIndex(index);
        }
    }

    /**
     * Perform up bottom node sift, O(log(n))
     * @param {*} index
     */
    #siftDown(index) {
        const heapSize = this._heap.length;
        while (index < heapSize) {
            let left = this.#leftChildIndex(index);
            let right = this.#rightChildIndex(index);
            let smallest = left; // Assume left is the smallest node of the two children

            // Find which is smaller left or right
            // If right is smaller set smallest to be right
            if (right < heapSize && this.#less(right, left)) smallest = right;

            // Stop if we're outside the bounds of the tree
            // or stop early if we cannot sink index anymore
            if (left >= heapSize || this.#less(index, smallest)) break;

            // Move down the tree following the smallest node
            this.#swap(smallest, index);
            index = smallest;
        }
    }

    /**
     * 1 - Always start by inserting the element at the bottom. We insert at the rightmost spot
     * so as to maintain the complete tree property.
     * 2 - "Fix" (heap condition(invariant)) the tree by swapping the new element with its parent,
     * until we find an appropriate spot for the element. We essentially bubble up
     * the minimum element.
     *
     * Time complexity: O(log(n))
     *
     * @param {*} element - should have comparable interface
     */
    push(element) {
        if (element === null || element === undefined)
            throw new Error('element must not be null');

        this._heap.push(element); // insert at the bottom
        this.#siftUp(this._heap.length - 1);
    }

    /**
     * Extract Minimum Element
     * The minimum element of a min-heap is always at the top.
     * 1 - We remove the minimum element and swap it with the last element in the heap
     * (the bottommost, rightmost element).
     * 2 - We bubble down this element, swapping it with one of its children until the
     * min-heap property is restored.
     * There is no inherent ordering between the left and right element, but you'll need to
     * take the smaller one in order to maintain the min-heap ordering.
     *
     * Time complexity: O(log(n))
     */
    pop() {
        if (this.#isEmpty()) return null;

        this.#swap(0, this._heap.length - 1);

        const removedMinElement = this._heap.pop(); // remove

        if (this.#isEmpty()) return removedMinElement;

        this.#siftDown(0);

        return removedMinElement;
    }

    toString() {
        return '' + this._heap;
    }
}

module.exports = { BinaryHeap };
