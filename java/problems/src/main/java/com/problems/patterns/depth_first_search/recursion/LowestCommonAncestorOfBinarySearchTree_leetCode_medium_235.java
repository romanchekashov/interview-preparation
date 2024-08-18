package com.problems.patterns.depth_first_search.recursion;

import com.problems.AbsLeetCodeSolution;
import com.problems.patterns.TreeNode;

/**
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/
 * Medium
 *
 * Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.
 *
 * According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”
 */
public class LowestCommonAncestorOfBinarySearchTree_leetCode_medium_235 extends AbsLeetCodeSolution {

  /**
   * Approach: Iterative
   * 1. Traverse the tree until we find the node where p and q are on the left and right side of the node.
   * 2. If p and q are less than the node, then move to the left node.
   * 3. If p and q are greater than the node, then move to the right node.
   * 4. If p and q are on the left and right side of the node, then return the node.
   * 5. If the node is null, then return null.
   *
   * Time complexity: O(log(n))
   * Space complexity: O(1)
   *
   * @param root
   * @param p
   * @param q
   * @return
   */
  public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    var node = root;

    while (node != null) {
      if (p.val < node.val && q.val < node.val) {
        node = node.left;
      } else if (p.val > node.val && q.val > node.val) {
        node = node.right;
      } else {
        return node;
      }
    }
    return null;
  }

  @Override
  public void tests() {
    doAssert(lowestCommonAncestor(
            TreeNode.fromArray(6,2,8,0,4,7,9,null,null,3,5), new TreeNode(2), new TreeNode(8)
    ).val, 6);
    doAssert(lowestCommonAncestor(
            TreeNode.fromArray(6,2,8,0,4,7,9,null,null,3,5), new TreeNode(2), new TreeNode(4)
    ).val, 2);
  }

  public static void main(String[] args) {
    new LowestCommonAncestorOfBinarySearchTree_leetCode_medium_235().executeTests();
  }
}
