const { assert, measurePerformance } = require('./../../../Utils');

/**
 * https://leetcode.com/problems/merge-two-sorted-lists/
 *
 * 21. Merge Two Sorted Lists
 *
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.
 * Return the head of the merged linked list.
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    let head = null, list;

    while (list1 || list2) {
        let val;
        if (list1 && list2) {
            if (list1.val < list2.val) {
                val = list1.val;
                list1 = list1.next;
            } else {
                val = list2.val;
                list2 = list2.next;
            }
        } else if (list1) {
            val = list1.val;
            list1 = list1.next;
        } else {
            val = list2.val;
            list2 = list2.next;
        }

        if (!list) {
            head = {val, next: null};
            list = head;
        } else {
            list.next = {val, next: null};
            list = list.next;
        }
    }

    return head;
};

const solutions = [
    mergeTwoLists
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([1,1,2,3,4,4], solution([1,2,4], [1,3,4]));
        assert([], solution([], []));
        assert([0], solution([], [0]));
    });
});
