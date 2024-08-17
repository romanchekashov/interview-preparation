package com.problems.patterns;


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
        return fromArray(arr, 0);
    }

    private static TreeNode fromArray(Integer[] arr, int start) {
        if (start >= arr.length || arr[start] == null) return null;
        TreeNode root = new TreeNode(arr[start]);
        root.left = fromArray(arr, 2 * start + 1);
        root.right = fromArray(arr, 2 * start + 2);
        return root;
    }
}
