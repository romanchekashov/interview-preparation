const { BinaryHeap } = require('../Heap/BinaryHeap');

/**
 * A Priority Queue(PQ) is an Abstract Data Type(ADT) that operates similar to a normal queue
 * except that EACH ELEMENT HAS A CERTAIN PRIORITY.
 * The priority of the elements in the PQ determine the order in which elements are removed from the PQ.
 *
 * NOTE: PQ-s only supports COMPARABLE DATA, meaning the data inserted into the PQ
 * must be able to be ordered in some way either from least to greatest or greatest to least.
 * This is so that we are able to assign relative priorities to each element.
 *
 * A priority queue is an Abstract Data Type (ADT) offering methods that allow removal of the item with the
 * maximum (or minimum) key value, insertion, and sometimes other operations.
 *
 * A Priority Queue(PQ) is an abstract data type(ADT) similar to a regular queue or stack data structure
 * in which each element additionally has a "priority" associated with it.
 * In a priority queue, an element with high priority is served before an element with low priority.
 * In some implementations, if two elements have the same priority, they are served according to the order in which they were enqueued,
 * while in other implementations, ordering of elements with the same priority is undefined.
 *
 * While priority queues are often implemented with heaps, they are conceptually distinct from heaps.
 * A priority queue is a concept like "a list" or "a map"; just as a list can be implemented with a linked list or an array,
 * a priority queue can be implemented with a heap or a variety of other methods such as an unordered array.
 *
 * IMPORTANT:
 * Each node in a heap satisfies the heap condition, which states that every node’s key is larger(less) than (or equal to) the keys of its children.
 */
class PriorityQueue {
    #binaryMinHeap = new BinaryHeap();

    push = (element) => this.#binaryMinHeap.push(element);

    pop = () => this.#binaryMinHeap.pop();

    toString() {
        return '' + this.#binaryMinHeap;
    }

    toArray() {
        return [...this.#binaryMinHeap._heap];
    }
}

module.exports = { PriorityQueue };
