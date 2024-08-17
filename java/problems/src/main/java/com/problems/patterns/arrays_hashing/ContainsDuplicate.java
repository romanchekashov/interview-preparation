package com.problems.patterns.arrays_hashing;

import com.problems.AbsLeetCodeSolution;

import java.util.HashSet;
import java.util.Set;

/**
 * https://leetcode.com/problems/contains-duplicate/
 * Easy
 * Given an integer array NUMS, return TRUE if any value appears at least twice in the array, and return FALSE if every element is distinct.
 */
public class ContainsDuplicate extends AbsLeetCodeSolution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> uniqueSet = new HashSet<>();
        for (int num: nums) {
            if (uniqueSet.contains(num)) return true;
            uniqueSet.add(num);
        }
        return false;
    }

    @Override
    public void tests() {
        doAssert(containsDuplicate(new int[]{1,2,3,1}) == true);
        doAssert(containsDuplicate(new int[]{1,2,3,4}) == false);
        doAssert(containsDuplicate(new int[]{1,1,1,3,3,4,3,2,4,2}) == true);
    }

    public static void main(String[] args) {
        new ContainsDuplicate().executeTests();
    }
}
