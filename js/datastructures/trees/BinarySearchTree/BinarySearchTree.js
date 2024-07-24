/**
 * A BINARY TREE (BT) is a tree for which every node has at most two child nodes.
 *
 * A COMPLETE BT is a binary tree in which every level of the tree is fully filled,
 * except for perhaps the last level. To the extent that the last level is filled,
 * it is filled left to right.
 *
 * A FULL BT is a binary tree in which every node has either zero or two children.
 * That is, no nodes have only one child.
 */

/**
 * A BINARY SEARCH TREE is a BT that satisfies the BST invariant:
 * left subtree has smaller elements and right subtree has larger elements.
 * (all left descendents <= n <= all right descendents)
 *
 * BST elements must be COMPARABLE so that we can order them inside the tree.
 *
 * Time complexity of BSTs
 *           Average    Worst
 * Insert   O(log(n))   O(n)
 * Delete   O(log(n))   O(n)
 * Remove   O(log(n))   O(n)
 * Search   O(log(n))   O(n)
 *
 * This file contains an implementation of a Binary Search Tree (BST) Any comparable data is allowed
 * within this tree (numbers, strings, comparable Objects, etc...). Supported operations include
 * adding, removing, height, and containment checks. Furthermore, multiple tree traversal Iterators
 * are provided including: 1) Preorder traversal 2) Inorder traversal 3) Postorder traversal 4)
 * Levelorder traversal
 *
 */
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
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

class BinarySearchTree {
    #size = 0;
    [root] = null;

    // read-only
    get size() {
        return this.#size;
    }

    /**
     * Add an element to this binary tree.
     * Returns true if we successfully perform an insertion
     * @param {*} elem
     */
    add(elem) {
        // Check if the value already exists in this
        // binary tree, if it does ignore adding it
        if (this.contains(elem)) return false;

        // Otherwise add this element to the binary tree
        this[root] = this.#add(this[root], elem);
        this.#size++;
        return true;
    }

    /**
     * Remove a value from this binary tree if it exists, O(n)
     * @param {*} elem
     */
    remove(elem) {
        // Make sure the node we want to remove
        // actually exists before we remove it
        if (this.contains(elem)) {
            this[root] = this.#remove(this[root], elem);
            this.#size--;
            return true;
        }
        return false;
    }

    /**
     * returns true is the element exists in the tree
     * @param {*} elem
     */
    contains(elem) {
        return this.#contains(this[root], elem);
    }

    /**
     * Computes the height of the tree, O(n)
     */
    height() {
        return this.#height(this[root]);
    }

    /**
     * Recursive helper method to compute the height of the tree
     * @param {*} node
     */
    #height(node) {
        if (node === null) return 0;
        return Math.max(this.#height(node.left), this.#height(node.right)) + 1;
    }

    #remove(node, elem) {
        if (node === null) return null;

        // Dig into left subtree, the value we're looking
        // for is smaller than the current value
        if (elem < node.val) {
            node.left = this.#remove(node.left, elem);

            // Dig into right subtree, the value we're looking
            // for is greater than the current value
        } else if (elem > node.val) {
            node.right = this.#remove(node.right, elem);

            // Found the node we wish to remove
        } else {
            // This is the case with only a right subtree or
            // no subtree at all. In this situation just
            // swap the node we wish to remove with its right child.
            if (node.left === null) {
                return node.right;

                // This is the case with only a left subtree or
                // no subtree at all. In this situation just
                // swap the node we wish to remove with its left child.
            } else if (node.right === null) {
                return node.left;

                // When removing a node from a binary tree with two links the
                // successor of the node being removed can either be the largest
                // value in the left subtree or the smallest value in the right
                // subtree. In this implementation I have decided to find the
                // smallest value in the right subtree which can be found by
                // traversing as far left as possible in the right subtree.
            } else {
                // Find the leftmost node in the right subtree
                const tmp = this.#findMin(node.right);

                // Swap the data
                node.val = tmp.val;

                // Go into the right subtree and remove the leftmost node we
                // found and swapped data with. This prevents us from having
                // two nodes in our tree with the same value.
                node.right = this.#remove(node.right, tmp.val);

                // If instead we wanted to find the largest node in the left
                // subtree as opposed to smallest node in the right subtree
                // here is what we would do:
                // Node tmp = findMax(node.left);
                // node.val = tmp.val;
                // node.left = remove(node.left, tmp.val);
            }
        }

        return node;
    }

    /**
     * Helper method to find the leftmost node (which has the smallest value)
     * @param {*} node
     */
    #findMin(node) {
        while (node.left !== null) node = node.left;
        return node;
    }

    /**
     * Helper method to find the rightmost node (which has the largest value)
     * @param {*} node
     */
    #findMax(node) {
        while (node.right !== null) node = node.right;
        return node;
    }

    /**
     * Private method to recursively add a value in the binary tree
     * @param {*} node
     * @param {*} elem
     */
    #add(node, elem) {
        // Base case: found a leaf node
        if (node === null) {
            node = new TreeNode(elem);
        } else {
            // Pick a subtree to insert element
            if (elem <= node.val) {
                node.left = this.#add(node.left, elem);
            } else {
                node.right = this.#add(node.right, elem);
            }
        }

        return node;
    }

    /**
     * private recursive method to find an element in the tree
     * @param {*} node
     * @param {*} elem
     */
    #contains(node, elem) {
        // Base case: reached bottom, value not found
        if (node === null) return false;

        // Dig into the left subtree because the value we're
        // looking for is smaller than the current value
        if (elem < node.val) return this.#contains(node.left, elem);

        // Dig into the right subtree because the value we're
        // looking for is greater than the current value
        if (elem > node.val) return this.#contains(node.right, elem);

        // We found the value we were looking for
        return true;
    }

    /**
     * The default iterator for the class.
     * @returns {Iterator} inOrderTraversal iterator
     */
    [Symbol.iterator]() {
        return this.inOrderTraversal();
    }

    /**
     * In-order traversal means to "visit" (often, print) the left branch,
     * then the current node, and finally, the right branch.
     * For BST:
     * When performed on a binary search tree,
     * it visits the nodes in ascending order (hence the name "in-order").
     */
    *inOrderTraversal() {
        /*
         * Traversal is easiest when using a recursive function, so define
         * a helper function here. This function does an in-order traversal
         * of the tree, meaning it yields values in sorted order from
         * lowest value to highest. It does this by traversing to the leftmost
         * node first, then working its way back up the tree, visiting right nodes
         * along the way.
         *
         * This function cannot be an arrow function because arrow functions
         * cannot be generators.
         */
        function* traverse(node) {
            // special case: there is no node
            if (node) {
                //traverse the left subtree
                if (node.left !== null) {
                    yield* traverse(node.left);
                }

                // emit the value
                yield node.val;

                //traverse the right subtree
                if (node.right !== null) {
                    yield* traverse(node.right);
                }
            }
        }

        yield* traverse(this[root]);
    }

    /**
     * Pre-order traversal visits the current node before its child nodes
     * (hence the name "pre-order").
     * In a pre-order traversal, the root is always the first node visited.
     */
    *preOrderTraversal() {
        function* traverse(node) {
            // special case: there is no node
            if (node) {
                // emit the value
                yield node.val;

                //traverse the left subtree
                if (node.left !== null) {
                    yield* traverse(node.left);
                }

                //traverse the right subtree
                if (node.right !== null) {
                    yield* traverse(node.right);
                }
            }
        }

        yield* traverse(this[root]);
    }

    /**
     * Post-order traversal visits the current node after its child nodes
     * (hence the name "post-order").
     * In a post-order traversal, the root is always the last node visited.
     */
    *postOrderTraversal() {
        function* traverse(node) {
            // special case: there is no node
            if (node) {
                //traverse the left subtree
                if (node.left !== null) {
                    yield* traverse(node.left);
                }

                //traverse the right subtree
                if (node.right !== null) {
                    yield* traverse(node.right);
                }

                // emit the value
                yield node.val;
            }
        }

        yield* traverse(this[root]);
    }

    /**
     * In a level order traversal we want to print the nodes as they appear
     * one layer at a time.
     *
     * To obtain this ordering we want to do a BREADTH FIRST SEARCH (BFS) from the
     * root node down to the leaf nodes.
     * To do a BFS we will need to maintain a Queue of the nodes left to explore.
     * Begin with the root inside of the queue and finish when the queue is empty.
     * At each iteration we add the left child and then the right child of the
     * current node to our Queue.
     */
    *levelOrderTraversal() {
        const queue = {
            head: null,
            tail: null,
            push(el) {
                const node = {
                    val: el,
                    next: null,
                };

                if (this.tail) this.tail.next = node;
                this.tail = node;
                if (!this.head) this.head = this.tail;
            },
            poll() {
                if (!this.head) return undefined;

                const val = this.head.val;
                this.head = this.head.next;
                if (!this.head) this.tail = null;

                return val;
            },
            isNotEmpty() {
                return !!this.head;
            },
        };

        queue.push(this[root]);

        while (queue.isNotEmpty()) {
            const node = queue.poll();
                if (node.left !== null) queue.push(node.left);
                if (node.right !== null) queue.push(node.right);
                yield node.val;
        }
    }
}

module.exports = { BinarySearchTree, TreeNode };
