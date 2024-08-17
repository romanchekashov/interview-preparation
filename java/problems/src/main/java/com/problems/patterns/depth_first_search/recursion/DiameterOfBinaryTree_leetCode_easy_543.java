package com.problems.patterns.depth_first_search.recursion;

import com.problems.AbsLeetCodeSolution;
import com.problems.patterns.TreeNode;

/**
 * https://leetcode.com/problems/diameter-of-binary-tree/description/
 * Easy
 *
 * Given the root of a binary tree, return the length of the diameter of the tree.
 *
 * The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.
 *
 * The length of a path between two nodes is represented by the number of edges between them.
 */
public class DiameterOfBinaryTree_leetCode_easy_543 extends AbsLeetCodeSolution {

  int diameter = 0;

  /**
   * Time complexity: O(n)
   * Space complexity: O(n)
   *
   * @param root
   * @return
   */
  public int diameterOfBinaryTree(TreeNode root) {
    diameter = 0;
    longestPath(root);
    return diameter;
  }

  int longestPath(TreeNode node) {
    if (node == null) return 0;

    int left = longestPath(node.left);
    int right = longestPath(node.right);

    diameter = Math.max(diameter, left + right);

    return Math.max(left, right) + 1;
  }

  @Override
  public void tests() {
    doAssert(diameterOfBinaryTree(
            TreeNode.fromArray(new Integer[]{1,2,3,4,5})
    ), 3);
    doAssert(diameterOfBinaryTree(
            TreeNode.fromArray(new Integer[]{1,2})
    ), 1);
  }

  public static void main(String[] args) {
    new DiameterOfBinaryTree_leetCode_easy_543().executeTests();
  }
}
