package com.problems.patterns.depth_first_search.recursion;

import com.problems.AbsLeetCodeSolution;
import com.problems.patterns.TreeNode;

import java.util.Arrays;

/**
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/description/
 * Easy
 *
 * Given the root of a binary tree, return its maximum depth.
 *
 * A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 */
public class MaximumDepthOfBinaryTree_leetCode_easy_104 extends AbsLeetCodeSolution {

  /**
   * Approach: Recursion
   * 1. If the node is null, then return 0.
   * 2. Recursively calculate the maximum depth of the left and right nodes.
   * 3. Return the maximum depth of the left and right nodes + 1.
   * 4. The base case is when the node is null, then return 0.
   * 5. The recursive case is to calculate the maximum depth of the left and right nodes.
   * 6. Return the maximum depth of the left and right nodes + 1.
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   *
   * @param node
   * @return
   */
  public int maxDepth(TreeNode node) {
    if (node == null) return 0;

    var left = maxDepth(node.left);
    var right = maxDepth(node.right);

    return Math.max(left, right) + 1;
  }

  @Override
  public void tests() {
    doAssert(maxDepth(
            TreeNode.fromArray(3,9,20,null,null,15,7)
    ), 3);
    doAssert(maxDepth(
            TreeNode.fromArray(1,null,2)
    ), 2);
  }

  public static void main(String[] args) {
    new MaximumDepthOfBinaryTree_leetCode_easy_104().executeTests();
  }
}
