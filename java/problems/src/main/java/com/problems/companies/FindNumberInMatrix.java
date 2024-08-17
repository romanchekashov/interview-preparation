package com.problems.companies;

import leetcode.AbsLeetCodeSolution;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * In a 2D matrix, every row ins increasingly sorted from left to right.
 * Last number in each row is not greater then first number in next row.
 * Write java function to check if there is a number in the matrix
 *
 * LeetCode: https://leetcode.com/problems/search-a-2d-matrix/
 * 74. Search a 2D Matrix
 *
 * Time complexity : O(log(m * n))
 * Space complexity : O(1)
 */
public class FindNumberInMatrix extends AbsLeetCodeSolution {

    public static void main(String[] args) {
        new FindNumberInMatrix().executeTests();
    }

    @Override
    public void tests() {
//        doAssert(findOneDuplicate(List.of(1, 3, 6, 6, 5)) == 6);
//        doAssert(findOneDuplicateXor(new int[]{1, 2, 3, 3, 4}) == 3);
//        doAssert(countPair(List.of(1, 1, 1, 1, 1, 1, 1, 1)) == 0);
//        doAssert(countPair(List.of(1, 2, 3, 4, 1, -1, -1, -2, 2, -2, 3, 4, -4, 11, -5, 9, -5)) == 3);
    }

    public static boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length;
        int n = matrix[0].length;
        int left = 0, right = m * n - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            int mid_val = matrix[mid / n][mid % n];

            if (target > mid_val) {
                left = mid + 1;
            } else if (target < mid_val) {
                right = mid - 1;
            } else {
                return true;
            }
        }
        return false;
    }

}
