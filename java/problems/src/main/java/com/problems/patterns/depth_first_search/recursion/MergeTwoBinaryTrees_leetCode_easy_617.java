package com.problems.patterns.depth_first_search.recursion;

import com.problems.AbsLeetCodeSolution;
import com.problems.patterns.TreeNode;

import java.util.Arrays;

/**
 * https://leetcode.com/problems/merge-two-binary-trees/description/
 * Easy
 *
 * You are given two binary trees root1 and root2.
 *
 * Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree.
 *
 * Return the merged tree.
 *
 * Note: The merging process must start from the root nodes of both trees.
 */
public class MergeTwoBinaryTrees_leetCode_easy_617 extends AbsLeetCodeSolution {

  /**
   * Approach: Recursion
   * 1. If both nodes are null, then return null.
   * 2. If one of the nodes is null, then return the other node.
   * 3. Add the values of the nodes.
   * 4. Recursively merge the left and right nodes of the trees.
   * 5. Return the merged tree.
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   *
   * @param node1
   * @param node2
   * @return
   */
  public TreeNode mergeTrees(TreeNode node1, TreeNode node2) {
    if (node1 == null) return node2;
    if (node2 == null) return node1;

    node1.val += node2.val;

    node1.left = mergeTrees(node1.left, node2.left);
    node1.right = mergeTrees(node1.right, node2.right);

    return node1;
  }

  @Override
  public void tests() {
    doAssert(mergeTrees(
            TreeNode.fromArray(1,3,2,5),
            TreeNode.fromArray(2,1,3,null,4,null,7)
    ).toList(), Arrays.asList(3,4,5,5,4,null,7));
    doAssert(mergeTrees(
            TreeNode.fromArray(1),
            TreeNode.fromArray(1,2)
    ).toList(), Arrays.asList(2, 2));
  }

  public static void main(String[] args) {
    new MergeTwoBinaryTrees_leetCode_easy_617().executeTests();
  }
}
