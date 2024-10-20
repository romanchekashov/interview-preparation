const { assert, measurePerformance } = require('../../Utils');

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * https://leetcode.com/problems/delete-node-in-a-linked-list/
 *
 * Approach: Swap with Next Node [Accepted]
 * The usual way of deleting a node node from a linked list is to modify the next pointer of the node before it, to point to the node after it.
 * Since we do not have access to the node before the one we want to delete, we cannot modify the next pointer of that node in any way.
 * Instead, we have to replace the value of the node we want to delete with the value in the node after it, and then delete the node after it.
 * Because we know that the node we want to delete is not the tail of the list, we can guarantee that this approach is possible.
 *
 * Complexity Analysis
 * Time and space complexity are both O(1).
 *
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
    node.val = node.next.val;
    node.next = node.next.next;
};

const solutions = [deleteNode];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {});
});
