const { assert, measurePerformance } = require('./../../../Utils');

/**
 * https://leetcode.com/problems/minimum-depth-of-binary-tree/
 * 111. Minimum Depth of Binary Tree
 *
 * Given a binary tree, find its minimum depth.
 * The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
 *
 * Note: A leaf is a node with no children.
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Graph traversal: Breadth first: Queue
 *
 * @param {TreeNode} root
 * @return {number}
 */
var minDepthBFS = function(root) {
    if (root === null) {
        return 0;
    }

    const queue = [root];
    let minDepth = 0;

    while (queue.length > 0) {

        minDepth++;

        for (let i = 0, len = queue.length; i < len; i++) {
            const node = queue.shift();

            node.left != null && queue.push(node.left);
            node.right != null && queue.push(node.right);

            if (node.left === null && node.right === null) {
                return minDepth;
            }
        }
    }

    return minDepth;
};

/**
 * Graph traversal: Depth first: Recursive
 *
 * @param {TreeNode} root
 * @return {number}
 */
var minDepthDFS = function(root) {
    if (root === null) {
        return 0;
    }

    let minDepth = Number.POSITIVE_INFINITY;

    const helper = (root, depth) => {
        if (!root) return;
        // check whether or not is a leaf
        if (!root.left && !root.right) {
            minDepth = Math.min(depth, minDepth);
            return;
        }

        helper(root.left, depth + 1)
        helper(root.right, depth + 1)
    }

    helper(root, 1);

    return minDepth;
};

const solutions = [
    minDepthBFS,
    minDepthDFS
];

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

const createTreeNode = (treeAsArray) => {
    if (treeAsArray.length === 0) return null;

    const root = new TreeNode(treeAsArray[0]);
    const queue = [root];
    let index = 1;

    while (index < treeAsArray.length) {
        for (let i = 0, len = queue.length; i < len; i++) {
            const node = queue.shift();

            let val = treeAsArray[index++];
            if (val !== null) {
                node.left = new TreeNode(val);
                queue.push(node.left);
            }

            val = treeAsArray[index++];
            if (val !== null) {
                node.right = new TreeNode(val);
                queue.push(node.right);
            }
        }
    }

    return root;
};

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        let treeNode = createTreeNode([3,9,20,null,null,15,7]);
        assert(2, solution(treeNode));

        treeNode = createTreeNode([2,null,3,null,4,null,5,null,6]);
        assert(5, solution(treeNode));

        treeNode = createTreeNode([1,2,3,4,null,null,5]);
        assert(3, solution(treeNode));
    });
});
