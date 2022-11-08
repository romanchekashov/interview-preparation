// Binary Search Tree

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

/**
 * Unbalanced Binary Search Tree
 *
 * Tree Height is a distance between root node and any given node.(like layer of a cake)
 * For example: root height = 0, on second level height = 1 and so on.
 *
 * BST MinHeight is a distance between ROOT node to the leaf node WITHOUT TWO CHILDREN.
 *
 * BST MaxHeight is a distance between ROOT node to the MOST BOTTOM node.
 *
 * BST is BALANCED if difference between MinHeight and MaxHeight is less or equal to 1!
 * |MaxHeight - MinHeight| <= 1
 * In balanced BS tree search is more efficient.
 */
class BST {
    root = null;

    add(data) {
        if (this.root === null) {
            this.root = new Node(data);
        } else {
            const queue = [this.root];

            while (queue.length > 0) {
                const node = queue.shift();
                if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                    } else {
                        queue.push(node.right);
                    }
                } else if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data);
                    } else {
                        queue.push(node.left);
                    }
                }
            }
        }
    }

    findMin() {
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data
    }

    findMax() {
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.data
    }

    isPresent(data) {
        let current = this.root;

        while (current) {
            if (data === current.data) {
                return true;
            }

            current = data > current.data ? current.right : current.left;
        }

        return false;
    }

    remove(data) {
        const removeNode = (node, data) => {
            if (node === null) {
                return null;
            }

            if (data === node.data) {
                // node has no children
                if (node.left === null && node.right === null) {
                    return null;
                }

                // node has no left child
                if (node.left === null) {
                    return node.right;
                }

                // node has no right child
                if (node.right === null) {
                    return node.left;
                }

                // node has two children, we should replace current node data with
                // data from last left node of current right node(because it keeps rules of BST nodes!)
                let tempNode = node.right; // on right node find last left node
                while (tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data; // swap current node data with found node data
                node.right = removeNode(node.right, tempNode.data); // remove found node data
                return node;
            } else if (data < node.data) {
                node.left = removeNode(node.left, data); // try to find and remove node from left node
                return node;
            } else { // if data > node.data
                node.right = removeNode(node.right, data); // try to find and remove node from right node
                return node;
            }
        }

        this.root = removeNode(this.root, data)
    }
    // balanced
    isBalanced() { // BST is BALANCED if difference between MinHeight and MaxHeight is less or equal to 1!
        return (this.findMinHeight() >= this.findMaxHeight() - 1);
    }

    findMinHeight(node = this.root) {
        if (node === null) {
            return -1;
        }
        const left = this.findMinHeight(node.left);
        const right = this.findMinHeight(node.right);

        // return lowest height
        return left < right ? left + 1 : right + 1;
    }

    findMaxHeight(node = this.root) {
        if (node === null) {
            return -1;
        }
        const left = this.findMaxHeight(node.left);
        const right = this.findMaxHeight(node.right);

        // return greatest height
        return left > right ? left + 1 : right + 1;
    }

    inOrder() {
        const result = [];
        if (this.root !== null) {
            const traverseInOrder = (node) => {
                node.left && traverseInOrder(node.left);
                result.push(node.data);
                node.right && traverseInOrder(node.right);
            }

            traverseInOrder(this.root);
        }
        return result;
    }

    preOrder() {
        const result = [];
        if (this.root !== null) {
            const traversePreOrder = (node) => {
                result.push(node.data);
                node.left && traversePreOrder(node.left);
                node.right && traversePreOrder(node.right);
            }

            traversePreOrder(this.root);
        }
        return result;
    }

    postOrder() {
        const result = [];
        if (this.root !== null) {
            const traversePostOrder = (node) => {
                node.left && traversePostOrder(node.left);
                node.right && traversePostOrder(node.right);
                result.push(node.data);
            }

            traversePostOrder(this.root);
        }
        return result;
    }

    levelOrder() {
        const result = [];

        if (this.root !== null) {
            const queue = [this.root];
            while (queue.length > 0) {
                const node = queue.shift();
                result.push(node.data);
                node.left !== null && queue.push(node.left);
                node.right !== null && queue.push(node.right);
            }
        }

        return result;
    }
}

module.exports = { BST };
