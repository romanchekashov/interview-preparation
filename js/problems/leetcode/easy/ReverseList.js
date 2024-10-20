const { assert, measurePerformance } = require('../../../Utils');

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * Complexity analysis:
 * Time complexity : O(n). Assume that n is the list's length, the time complexity is O(n).
 * Space complexity : O(n). Creating new list.
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    let reversed = null;
    while (head) {
        reversed = {
            val: head.val,
            next: reversed,
        };
        head = head.next;
    }
    return reversed;
};

/**
 * Assume that we have linked list 1 → 2 → 3 → Ø, we would like to change it to Ø ← 1 ← 2 ← 3.
 *
 * While you are traversing the list, change the current node's next pointer to point to its previous element.
 * Since a node does not have reference to its previous node, you must store its previous element beforehand.
 * You also need another pointer to store the next node before changing the reference.
 * Do not forget to return the new head reference at the end!
 *
 * Complexity analysis:
 * Time complexity : O(n). Assume that n is the list's length, the time complexity is O(n).
 * Space complexity : O(1).
 *
 * @param {*} head
 * @returns
 */
var reverseList2 = function (head) {
    let prev = null;
    let curr = head;

    while (curr) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
};

const solutions = [reverseList, reverseList2];

solutions.forEach((solution) => {
    console.log(`Run tests for: [${solution.name}]`);
    measurePerformance(() => {
        let head = {
            val: 1,
            next: {
                val: 2,
                next: {
                    val: 3,
                    next: null,
                },
            },
        };
        console.log('initial: ', head);
        let reversed = solution(head);
        console.log('reversed: ', reversed);
    });
});
