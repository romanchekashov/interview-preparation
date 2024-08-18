package com.problems.patterns.depth_first_search.recursion;

import com.problems.AbsLeetCodeSolution;
import com.problems.patterns.TreeNode;

/**
 * https://leetcode.com/problems/path-sum/description/
 * Easy
 *
 * Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.
 *
 * A leaf is a node with no children.
 */
public class PathSum_leetCode_easy_112 extends AbsLeetCodeSolution {

  /**
   * Approach: Recursion
   * 1. Check if the root is null, then return false.
   * 2. Subtract the current node value from the targetSum.
   * 3. If the current node is a leaf node, then check if the targetSum is 0, then return true else return false.
   * 4. Recursively check the left and right nodes of the tree.
   * 5. Return the result of the recursive calls.
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   *
   * @param root
   * @param targetSum
   * @return
   */
  public boolean hasPathSum(TreeNode root, int targetSum) {
    if (root == null) return false;
    targetSum -= root.val;
    if (root.left == null && root.right == null) return targetSum == 0;
    return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
  }

  @Override
  public void tests() {
    doAssert(hasPathSum(
            TreeNode.fromArray(5,4,8,11,null,13,4,7,2,null,null,null,1),
            22
    ), true);
    doAssert(hasPathSum(
            TreeNode.fromArray(1,2,3),
            5
    ), false);
    doAssert(hasPathSum(
            TreeNode.fromArray(),
            0
    ), false);
  }

  public static void main(String[] args) {
    new PathSum_leetCode_easy_112().executeTests();
  }
}
