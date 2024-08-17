package com.problems.companies;

import leetcode.AbsLeetCodeSolution;

import java.util.*;

/**
 * Write java function to find some element in binary search tree
 * https://leetcode.com/problems/binary-tree-inorder-traversal/
 */
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class TraverseTree extends AbsLeetCodeSolution {

    public static void main(String[] args) {
        new TraverseTree().executeTests();
    }

    @Override
    public void tests() {
//        doAssert(countPair(List.of(1, 3, 6, -1, 5, -3, -1, 6, -8, 3)) == 2);
//        doAssert(countPair(List.of(1, 1, 1, 1, 1, 1, 1, 1)) == 0);
//        doAssert(countPair(List.of(1, 2, 3, 4, 1, -1, -1, -2, 2, -2, 3, 4, -4, 11, -5, 9, -5)) == 3);
    }

    public List<Integer> inorderTraversalIterative(TreeNode root) {
        List<Integer> res = new ArrayList();
        if (root == null) return res;

        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);

        while(!stack.isEmpty()) {
            var node = stack.pop();
            res.add(node.val);
            if (node.right != null) stack.push(node.right);
            if (node.left != null) stack.push(node.left);
        }
        return res;
    }

    public List<Integer> inorderTraversalRecursive(TreeNode root) {
        List<Integer> res = new ArrayList();
        if (root != null) inOrder(root, res);
        return res;
    }

    void inOrder(TreeNode node, List<Integer> res) {
        if (node.left != null) inOrder(node.left, res);
        res.add(node.val);
        if (node.right != null) inOrder(node.right, res);
    }

}
