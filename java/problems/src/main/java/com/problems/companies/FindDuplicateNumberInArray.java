package com.problems.companies;

import leetcode.AbsLeetCodeSolution;

import java.util.*;

/**
 * An array contains numbers. Exactly one number is duplicated in the array. Write java function to find this duplicate
 */
public class FindDuplicateNumberInArray extends AbsLeetCodeSolution {

    public static void main(String[] args) {
        new FindDuplicateNumberInArray().executeTests();
    }

    @Override
    public void tests() {
        doAssert(findOneDuplicate(List.of(1, 3, 6, 6, 5)) == 6);
        doAssert(findOneDuplicateXor(new int[]{1, 2, 3, 3, 4}) == 3);
//        doAssert(countPair(List.of(1, 1, 1, 1, 1, 1, 1, 1)) == 0);
//        doAssert(countPair(List.of(1, 2, 3, 4, 1, -1, -1, -2, 2, -2, 3, 4, -4, 11, -5, 9, -5)) == 3);
    }

    /**
     * Time: O(n) | Space: O(n)
     * @param numbers
     * @return
     */
    public static int findOneDuplicate(List<Integer> numbers) {
        Set<Integer> unique = new HashSet<>();
        for (int num: numbers) {
            if (unique.contains(num)) return num;
            unique.add(num);
        }
        throw new IllegalArgumentException("At least one duplicate should exists.");

//        return ;
    }

    /**
     * Only for arrays with values from 1 to n
     * Time: O(n) | Space: O(1)
     * https://www.geeksforgeeks.org/duplicates-array-using-o1-extra-space-set-3/
     *
     * Given an array arr[] containing n + 1 integers where each integer is between 1 and n (inclusive).
     * There is only one duplicate element, find the duplicate element in O(n) time complexity and O(1) space.
     *
     * In this approach we will be using XOR property that A ^ A = 0 to find the duplicate element.
     * We will first XOR all the elements of the array with 0 and store the result in the variable “answer”.
     * Then we will XOR all the elements from 1 to n with the value in “answer”, and returns the final value of “answer” which will be the duplicate element
     *
     * Solution:
     *  1) Initialize an answer variable with 0
     *  2) Iterate and XOR all the elements of array and update in answer variable
     *  3) XOR answer with numbers 1 to n
     * @param arr
     * @return
     */
    public static int findOneDuplicateXor(int[] arr) {
        int answer = 0;
        int n = arr.length;

        // XOR all the elements with 0
        for (int i = 0; i < n; i++) {
            answer = answer ^ arr[i];
        }

        // XOR all the elements with no from 1 to n
        // i.e   answer^0 = answer
        for (int i = 1; i < n; i++) {
            answer = answer ^ i;
        }

        return answer;
    }

}
