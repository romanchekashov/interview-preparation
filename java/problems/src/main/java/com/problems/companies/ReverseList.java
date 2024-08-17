package com.problems.companies;

import leetcode.AbsLeetCodeSolution;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Write java function to reverse elements in one directional linked list
 *
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
 */

// Definition for singly-linked list.
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }
}

public class ReverseList extends AbsLeetCodeSolution {

    public static void main(String[] args) {
        new ReverseList().executeTests();
    }

    @Override
    public void tests() {
        System.out.println(List.of(1, 2, 3));
//        System.out.println(reverse(List.of(1, 2, 3)));
    }

    public static ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            var nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }

}
