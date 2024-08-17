package com.problems.patterns.binary_search;

import com.problems.AbsLeetCodeSolution;

/**
 * 852. Peak Index in a Mountain Array
 * https://leetcode.com/problems/peak-index-in-a-mountain-array/description/
 * Medium
 *
 * You are given an integer mountain array arr of length n where the values increase to a peak element and then decrease.
 *
 * Return the index of the peak element.
 *
 * Your task is to solve it in O(log(n)) time complexity.
 */
public class PeakIndexInMountainArray_leetCode_medium_852 extends AbsLeetCodeSolution {
  /**
   * Approach: Binary search
   * 1. The given array is sorted in non-decreasing order, so we can use binary search to find the peak element.
   * 2. If the middle element is less than the next element, then we need to search in the right half of the array.
   * 3. If the middle element is greater than the next element, then we need to search in the left half of the array.
   * 4. We need to return the left index as the peak element.
   * 5. We can return left or right index as both will be equal.
   * 6. We can return left or right index as both will be equal.
   * 7. If the target is greater than or equal to the last element in the array, then we need to return the first element in the array.
   *
   * Time complexity: O(log n)
   */
  public int peakIndexInMountainArray(int[] arr) {
    int left = 0, right = arr.length - 1;

    while (left <= right) {
      int mid = left + (right - left) / 2;

      if (arr[mid] < arr[mid + 1]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return left;
  }

  @Override
  public void tests() {
    doAssert(peakIndexInMountainArray(new int[]{0,1,0}) == 1);
    doAssert(peakIndexInMountainArray(new int[]{0,2,1,0}) == 1);
    doAssert(peakIndexInMountainArray(new int[]{0,10,5,2}) == 1);
  }

  public static void main(String[] args) {
    new FindSmallestLetterGreaterThanTarget_leetCode_easy_744().executeTests();
  }
}
