package com.problems.patterns.binary_search;

import com.problems.AbsLeetCodeSolution;

/**
 * https://leetcode.com/problems/find-smallest-letter-greater-than-target/description/
 * Easy
 *
 * You are given an array of characters letters that is sorted in non-decreasing order, and a character target. There are at least two different characters in letters.
 *
 * Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.
 */
public class FindSmallestLetterGreaterThanTarget_leetCode_easy_744 extends AbsLeetCodeSolution {
    /**
     * Approach: Binary search
     * 1. The given array is sorted in non-decreasing order, so we can use binary search to find the smallest character in letters that is lexicographically greater than target.
     * 2. We can use binary search to find the smallest character in letters that is lexicographically greater than target.
     * 3. If the target is greater than or equal to the middle element, then we need to search in the right half of the array.
     * 4. If the target is less than the middle element, then we need to search in the left half of the array.
     * 5. We need to return the character at the index left % letters.length
     * 6. If the target is greater than or equal to the last element in the array, then we need to return the first element in the array.
     *
     * Time complexity: O(log n)
     * Space complexity: O(1)
     */
    public char nextGreatestLetter(char[] letters, char target) {
        int left = 0, right = letters.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (target >= letters[mid]) {
                left = mid + 1;
            } else if (target < letters[mid]) {
                right = mid - 1;
            }
        }
        return letters[left % letters.length];
    }

    @Override
    public void tests() {
        doAssert(nextGreatestLetter(new char[]{'c', 'f', 'j'}, 'a') == 'c');
        doAssert(nextGreatestLetter(new char[]{'c', 'f', 'j'}, 'c') == 'f');
        doAssert(nextGreatestLetter(new char[]{'x', 'x', 'y', 'y'}, 'z') == 'x');
    }

    public static void main(String[] args) {
        new FindSmallestLetterGreaterThanTarget_leetCode_easy_744().executeTests();
    }
}
