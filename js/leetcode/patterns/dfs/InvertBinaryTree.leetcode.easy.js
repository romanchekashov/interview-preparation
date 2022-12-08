const { assert, measurePerformance } = require('./../../../Utils');
const { createTreeNode } = require('../../../Utils');

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
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {

};

const solutions = [
    invertTree
];

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
