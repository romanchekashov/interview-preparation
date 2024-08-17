package com.problems.companies;

import leetcode.AbsLeetCodeSolution;
import problems.yandex.jobofferserbia.A;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Having two separate sorted arrays, write java function merging these arrays in single sorted array without sorting it
 * Tags: Two pointers
 * Similar: https://leetcode.com/problems/merge-two-sorted-lists/
 * 21. Merge Two Sorted Lists
 */
public class MergeSortedArrays extends AbsLeetCodeSolution {

    public static void main(String[] args) {
        new MergeSortedArrays().executeTests();
    }

    @Override
    public void tests() {
//        doAssert(countPair(List.of(1, 3, 6, -1, 5, -3, -1, 6, -8, 3)) == 2);
//        doAssert(countPair(List.of(1, 1, 1, 1, 1, 1, 1, 1)) == 0);
//        doAssert(countPair(List.of(1, 2, 3, 4, 1, -1, -1, -2, 2, -2, 3, 4, -4, 11, -5, 9, -5)) == 3);
    }

    public static List<Integer> mergeTwoLists(List<Integer> list1, List<Integer> list2) {
        List<Integer> res = new ArrayList<>(list1.size() + list2.size());

        return res;
    }

}
