package com.problems.patterns.breadth_first_search;

import com.problems.AbsLeetCodeSolution;
import com.problems.patterns.TreeNode;

import java.util.LinkedList;

/**
 * https://leetcode.com/problems/minimum-depth-of-binary-tree/description/
 * Easy
 *
 * Given a binary tree, find its minimum depth.
 *
 * The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
 *
 * Note: A leaf is a node with no children.
 */
public class MinimumDepthOfBinaryTree_leetCode_easy_111 extends AbsLeetCodeSolution {

  /**
   * Approach: Breadth first search
   * 1. Traverse the tree level by level and calculate the minimum depth of the tree.
   * 2. Use a queue to store the nodes at each level.
   * 3. If the node has no left and right child, then return the depth of that node.
   * 4. If the node has left child, then add it to the queue.
   * 5. If the node has right child, then add it to the queue.
   * 6. Return the minimum depth of the tree.
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   *
   * @param root
   * @return
   */
  public int minDepth(TreeNode root) {
    if (root == null) return 0;

    int minDepth = 0;
    var q = new LinkedList<TreeNode>();
    q.add(root);

    while (!q.isEmpty()) {
      int n = q.size();
      minDepth++;

      while (n-- > 0) {
        var node = q.removeFirst();
        if (node.left == null && node.right == null) return minDepth;
        if (node.left != null) q.add(node.left);
        if (node.right != null) q.add(node.right);
      }
    }
    return minDepth;
  }

    @Override
    public void tests() {
        doAssert(minDepth(TreeNode.fromArray(3,9,20,null,null,15,7)), 2);
        doAssert(minDepth(TreeNode.fromArray(2,null,3,null,4,null,5,null,6)), 5);
    }

    public static void main(String[] args) {
        new MinimumDepthOfBinaryTree_leetCode_easy_111().executeTests();
    }
}
