package com.problems.patterns.breadth_first_search;

import com.problems.AbsLeetCodeSolution;
import com.problems.patterns.TreeNode;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * https://leetcode.com/problems/average-of-levels-in-binary-tree/description/
 * Easy
 *
 * Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.
 */
public class AverageOfLevelsInBinaryTree_leetCode_easy_637 extends AbsLeetCodeSolution {

    /**
     * Approach: Breadth first search
     * 1. Traverse the tree level by level and calculate the average of each level.
     * 2. Use a queue to store the nodes at each level.
     * 3. Calculate the sum of all nodes at each level and divide it by the number of nodes at that level.
     * 4. Add the average to the result list.
     * 5. Return the result list.
     *
     * Time complexity: O(n)
     * Space complexity: O(n)
     *
     * @param root
     * @return
     */
    public List<Double> averageOfLevels(TreeNode root) {
        var result = new ArrayList<Double>();
        var queue = new LinkedList<TreeNode>();
        queue.add(root);

        while (!queue.isEmpty()) {
            int len = queue.size();
            long sum = 0L;
            for (int i = 0; i < len; i++) {
                var node = queue.removeFirst();
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
                sum += node.val;
            }
            result.add(sum / (double) len);
        }
        return result;
    }

    @Override
    public void tests() {
        doAssert(averageOfLevels(TreeNode.fromArray(new Integer[]{3, 9, 20, null, null, 15, 7})), List.of(3.00000,14.50000,11.00000));
        doAssert(averageOfLevels(TreeNode.fromArray(new Integer[]{3,9,20,15,7})), List.of(3.00000,14.50000,11.00000));
    }

    public static void main(String[] args) {
        new AverageOfLevelsInBinaryTree_leetCode_easy_637().executeTests();
    }
}
