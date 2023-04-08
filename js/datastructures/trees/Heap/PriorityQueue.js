/**
 * Parent node index: i
 * Left child index:  2*i + 1
 * Right child index: 2*i + 2
 *
 * left child index: (parentIndex * 2)
 * right child index: (parentIndex * 2) + 1
 * parent index: (childIndex / 2)
 */
class PriorityQueue {
    #heap = [null]; // skip index 0, in order to math(index calculation) looks better

    get heap() {
        return this.#heap.slice(1);
    }

    constructor(comparator = (a, b) => a - b) {
        this.comparator = comparator;
    }

    add(element) {
        // add item to end of array
        this.#heap.push(element);

        // restructure heap values
        if (this.#heap.length > 2) {
            let idx = this.#heap.length - 1;

            // if child value less than parent value then we should swap them
            while (idx >= 1 && this.comparator(this.#heap[idx], this.#heap[Math.floor(idx / 2)]) < 0) {
                // swap values with es6 array destruction
                [this.#heap[Math.floor(idx / 2)], this.#heap[idx]] = [this.#heap[idx], this.#heap[Math.floor(idx / 2)]];

                // proceed while parent index is not root because we already swapped it
                idx = Math.floor(idx / 2);

                if (idx <= 1) {
                    break;
                }
            }
        }
    }

    remove() {
        let top = this.#heap[1];

        if (this.#heap.length > 2) { // exists at lest 2 nodes
            // replace root node value with last leaf node
            this.#heap[1] = this.#heap[this.#heap.length - 1];
            // remove last leaf node
            this.#heap.splice(this.#heap.length - 1);

            // heap contains just 2 nodes
            if (this.#heap.length === 3) {
                // if root node value greater then child node value than just swap them
                if (this.comparator(this.#heap[1], this.#heap[2]) > 0) {
                    [this.#heap[1], this.#heap[2]] = [this.#heap[2], this.#heap[1]];
                }

                return top;
            }

            let i = 1;
            let left = 2 * i;
            let right = 2 * i + 1;

            while (this.comparator(this.#heap[i], this.#heap[left]) >= 0 || this.comparator(this.#heap[i], this.#heap[right]) >= 0) {
                // swap parent node with least of children
                if (this.comparator(this.#heap[left], this.#heap[right]) < 0) {
                    [this.#heap[i], this.#heap[left]] = [this.#heap[left], this.#heap[i]];
                    // replace parent index to least child index
                    i = left;
                } else {
                    [this.#heap[i], this.#heap[right]] = [this.#heap[right], this.#heap[i]];
                    // replace parent index to least child index
                    i = right;
                }

                // recalculate child indexes
                left = 2 * i;
                right = 2 * i + 1;

                if (this.#heap[left] === undefined || this.#heap[right] === undefined) {
                    break;
                }
            }

        } else if (this.#heap.length === 2) { // just one root exists, so just remove the root
            this.#heap.splice(1, 1);
        } else { // nothing to remove
            return null;
        }

        return top;
    }

    top() {
        return this.#heap[1];
    }

    toString() {
        return '' + this.heap;
    }
}

module.exports = { PriorityQueue };
