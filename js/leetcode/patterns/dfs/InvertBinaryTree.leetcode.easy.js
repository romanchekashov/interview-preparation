const { measurePerformance } = require('./../../../Utils');
const { createTreeNode } = require('../../../Utils');

/**
 * https://leetcode.com/problems/invert-binary-tree/
 * 226. Invert Binary Tree
 *
 * Given the 'root' of a binary tree, invert the tree, and return its root.
 *
 * Testcases:
 * 1 *
 * Input: root = [4,2,7,1,3,6,9]
 * Output: [4,7,2,9,6,3,1]
 * 2 *
 * Input: root = [2,1,3]
 * Output: [2,3,1]
 * 3 *
 * Input: root = []
 * Output: []
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
 * Graph traversal: Depth first: Stack
 *
 * Time complexity : O(n/2)
 * Space complexity : O(1), space for Stack
 *
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (root === null) {
        return null;
    }

    const stack = [root];

    while (stack.length > 0) {
        const node = stack.pop();

        const temp = node.left;
        node.left = node.right;
        node.right = temp;

        node.left && stack.push(node.left);
        node.right && stack.push(node.right);
    }

    return root;
};

const solutions = [
    invertTree
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        let treeNode = createTreeNode([4,2,7,1,3,6,9]);
        console.log(treeNode);
        solution(treeNode);
        console.log('Inverted: ', treeNode);

        treeNode = createTreeNode([2,1,3]);
        console.log(treeNode);
        solution(treeNode);
        console.log('Inverted: ', treeNode);

        treeNode = createTreeNode([]);
        console.log(treeNode);
        solution(treeNode);
        console.log('Inverted: ', treeNode);
    });
});
