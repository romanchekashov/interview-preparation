const { assert, measurePerformance, createSinglyLinkedList } = require('./../../../../Utils');

/**
 * https://leetcode.com/problems/linked-list-cycle/
 * 141. Linked List Cycle
 *
 * Given head, the head of a linked list, determine if the linked list has a cycle in it.
 *
 * There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.
 * Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
 *
 * Return true if there is a cycle in the linked list. Otherwise, return false.
 *
 * Constraints:
 *
 * The number of the nodes in the list is in the range [0, 104].
 * -105 <= Node.val <= 105
 * pos is -1 or a valid index in the linked-list.
 *
 * Follow up: Can you solve it using O(1) (i.e. constant) memory?
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 *
 * Complexity analysis:
 * Time complexity : O(n).
 * Space complexity : O(1).
 *
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let fast = head, slow = head;
    while (fast && slow) {
        fast = fast.next?.next;
        slow = slow.next;

        if (fast === slow) return true;
    }
    return false;
};

const solutions = [
    hasCycle
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(true, solution(createSinglyLinkedList([3,2,0,-4], 1)));
        assert(true, solution(createSinglyLinkedList([1,2], 0)));
        assert(false, solution(createSinglyLinkedList([1], -1)));
    });
});
