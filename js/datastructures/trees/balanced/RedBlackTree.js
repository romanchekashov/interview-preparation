/**
 * This file contains an implementation of a Red-Black tree. A RB tree is a special type of binary
 * tree which self balances itself to keep operations logarithmic.
 *
 * <p>Great visualization tool: https://www.cs.usfca.edu/~galles/visualization/RedBlack.html
 *
 */
const RED = true;
const BLACK = false;

class Node {
    // The color of this node. By default all nodes start red.
    color = RED;

    // The value/data contained within the node.
    value;

    // The left, right and parent references of this node.
    left;
    right;
    parent;

    constructor(value, parent) {
        this.value = value;
        this.parent = parent;
    }

    constructor(color, value) {
        this.color = color;
        this.value = value;
    }

    constructor(key, color, parent, left, right) {
        this.value = key;
        this.color = color;

        if (parent == null && left == null && right == null) {
            parent = this;
            left = this;
            right = this;
        }

        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}

/*
 * These symbols are used to represent properties that should not be part of
 * the public interface. You could also use ES2019 private fields, but those
 * are not yet widely available as of the time of my writing.
 */
const root = Symbol('root');

class RedBlackTree {
    constructor() {
        this.#NIL = new Node(BLACK, null);
        this.#NIL.left = this.#NIL;
        this.#NIL.right = this.#NIL;
        this.#NIL.parent = this.#NIL;

        this[root] = this.#NIL;
    }
}
