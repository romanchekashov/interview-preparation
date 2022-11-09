/**
 * Binary Heaps have some similarities to Binary Search Tree except the order a little different.
 * Each node has at most TWO child nodes.
 *
 * left child index: (parentIndex * 2)
 * right child index: (parentIndex * 2) + 1
 * parent index: (childIndex / 2)
 *
 * Max Heap - there all parent nodes are greater or equal to child nodes. Biggest number on TOP and smallest on bottom.
 *
 * Min Heap - there all child nodes are  greater or equal to parent nodes. Child nodes are biggest one and parent nodes are smallest.
 *
 * ORDER ON SAME LEVEL DOES NOT MATTER.
 * BINARY HEAPS ARE COMPLETE BINARY TREES.
 */
class MinHeap {
    heap = [null]; // skip index 0, in order to math(index calculation) looks better

    insert(num) {
        // add item to end of array
        this.heap.push(num);

        // restructure heap values
        if (this.heap.length > 2) {
            let idx = this.heap.length - 1;

            // if child value less than parent value then we should swap them
            while (idx >= 1 && this.heap[idx] < this.heap[Math.floor(idx / 2)]) {
                // swap values with es6 array destruction
                [this.heap[Math.floor(idx / 2)], this.heap[idx]] = [this.heap[idx], this.heap[Math.floor(idx / 2)]];

                // proceed while parent index is not root because we already swapped it
                idx = Math.floor(idx / 2);
                if (idx <= 1) {
                    break;
                }
            }
        }
    }

    removeSmallest() {
        // remove smallest(top) node
        let smallest = this.heap[1];

        if (this.heap.length > 2) { // exists at lest 2 nodes
            // replace root node value with last leaf node
            this.heap[1] = this.heap[this.heap.length - 1];
            // remove last leaf node
            this.heap.splice(this.heap.length - 1);

            // heap contains just 2 nodes
            if (this.heap.length === 3) {
                // if root node value greater then child node value than just swap them
                if (this.heap[1] > this.heap[2]) {
                    [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]];
                }

                return smallest;
            }

            let i = 1;
            let left = 2 * i;
            let right = 2 * i + 1;

            while (this.heap[i] >= this.heap[left] || this.heap[i] >= this.heap[right]) {
                // swap parent node with least of children
                if (this.heap[left] < this.heap[right]) {
                    [this.heap[i], this.heap[left]] = [this.heap[left], this.heap[i]];
                    // replace parent index to least child index
                    i = left;
                } else {
                    [this.heap[i], this.heap[right]] = [this.heap[right], this.heap[i]];
                    // replace parent index to least child index
                    i = right;
                }

                // recalculate child indexes
                left = 2 * i;
                right = 2 * i + 1;

                if (this.heap[left] === undefined || this.heap[right] === undefined) {
                    break;
                }
            }

        } else if (this.heap.length === 2) { // just one root exists, so just remove the root
            this.heap.splice(1, 1);
        } else { // nothing to remove
            return null;
        }

        return smallest;
    }

    sort() {
        const result = [];
        while (this.heap.length > 1) {
            result.push(this.removeSmallest());
        }
        return result;
    }
}
