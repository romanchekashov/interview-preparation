package com.problems.patterns;


import java.util.ArrayDeque;
import java.util.Queue;

/**
 * Definition for a binary tree node.
 */
public class TreeNode {
  public int val;
  public TreeNode left;
  public TreeNode right;

  public TreeNode() {}

  public TreeNode(int val) { this.val = val; }

  public TreeNode(int val, TreeNode left, TreeNode right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  public static TreeNode fromArray(Integer[] arr) {
    if (arr == null || arr.length == 0) return null;

    TreeNode root = new TreeNode(arr[0]);
    Queue<TreeNode> q = new ArrayDeque<>();
    q.add(root);

    for (int i = 1; i < arr.length; i++) {
      TreeNode node = q.poll();
      if (arr[i] != null) {
        node.left = new TreeNode(arr[i]);
        q.add(node.left);
      }
      if (++i < arr.length && arr[i] != null) {
        node.right = new TreeNode(arr[i]);
        q.add(node.right);
      }
    }

    return root;
  }
}
