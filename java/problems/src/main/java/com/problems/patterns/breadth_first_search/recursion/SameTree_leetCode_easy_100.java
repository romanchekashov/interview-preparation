package com.problems.patterns.breadth_first_search.recursion;

import com.problems.AbsLeetCodeSolution;
import com.problems.patterns.TreeNode;

/**
 * https://leetcode.com/problems/same-tree/description/
 * Easy
 *
 * Given the roots of two binary trees p and q, write a function to check if they are the same or not.
 *
 * Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
 */
public class SameTree_leetCode_easy_100 extends AbsLeetCodeSolution {

  /**
   * Approach: Recursion
   * 1. Check if both nodes are null, then return true.
   * 2. Check if one of the nodes is null, then return false.
   * 3. Check if the values of both nodes are not equal, then return false.
   * 4. Recursively check the left and right nodes of both trees.
   * 5. Return the result of the recursive calls.
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   *
   * @param p
   * @param q
   * @return
   */
  public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == q) return true;
    if (p == null && q != null) return false;
    if (p != null && q == null) return false;
    if (p.val != q.val) return false;

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }

    @Override
    public void tests() {
        doAssert(isSameTree(
                TreeNode.fromArray(new Integer[]{1,2,3}),
                TreeNode.fromArray(new Integer[]{1,2,3})
        ), true);
        doAssert(isSameTree(
                TreeNode.fromArray(new Integer[]{1,2}),
                TreeNode.fromArray(new Integer[]{1,null,2})
        ), false);
        doAssert(isSameTree(
                TreeNode.fromArray(new Integer[]{1,2,1}),
                TreeNode.fromArray(new Integer[]{1,1,2})
        ), false);
    }

    public static void main(String[] args) {
        new SameTree_leetCode_easy_100().executeTests();
    }
}
