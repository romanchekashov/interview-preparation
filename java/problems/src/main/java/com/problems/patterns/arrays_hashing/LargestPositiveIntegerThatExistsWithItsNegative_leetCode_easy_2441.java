package com.problems.patterns.arrays_hashing;

import com.problems.AbsLeetCodeSolution;
import com.problems.patterns.TreeNode;

import java.util.Arrays;

/**
 * https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative/
 * Easy
 *
 * Given an integer array nums that does not contain any zeros, find the largest positive integer k such that -k also exists in the array.
 *
 * Return the positive integer k. If there is no such integer, return -1.
 */
public class LargestPositiveIntegerThatExistsWithItsNegative_leetCode_easy_2441 extends AbsLeetCodeSolution {

  /**
   * Approach: Hashing
   * 1. Create a boolean array to store if the negative number exists in the array.
   * 2. Iterate the array and store the negative numbers in the boolean array.
   * 3. Iterate the array again and check if the number is positive and its negative exists in the array.
   * 4. If the number is greater than the current result, update the result.
   * 5. Return the result.
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   *
   * @param nums
   * @return
   */
  public int findMaxK(int[] nums) {
    int res = -1;
    boolean[] negatives = new boolean[1001];
    for (int n : nums) if (n < 0) negatives[-n] = true;
    for (int n : nums) {
      if (n < 0 || !negatives[n]) continue;
      if (n > res) res = n;
    }
    return res;
  }

  @Override
  public void tests() {
    doAssert(findMaxK(new int[]{-1,2,-3,3}), 3);
    doAssert(findMaxK(new int[]{-1,10,6,7,-7,1}), 7);
    doAssert(findMaxK(new int[]{-10,8,6,7,-2,-3}), -1);
  }

  public static void main(String[] args) {
    new LargestPositiveIntegerThatExistsWithItsNegative_leetCode_easy_2441().executeTests();
  }
}
