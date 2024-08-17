package com.problems.leetcode;

import com.problems.AbsLeetCodeSolution;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

public class LeetCodeEasy1207_UniqueNumberOfOccurrences extends AbsLeetCodeSolution {

    public static void main(String[] args) {
        new LeetCodeEasy1207_UniqueNumberOfOccurrences().executeTests();
    }

    @Override
    public void tests() {
        doAssert(uniqueOccurrences(new int[]{1,2,2,1,1,3}));
        doAssert(!uniqueOccurrences(new int[]{1,2}));
        doAssert(uniqueOccurrences(new int[]{-3,0,1,-3,1,1,1,-3,10,0}));
    }

    public boolean uniqueOccurrences(int[] arr) {
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int a: arr) freqMap.put(a, freqMap.getOrDefault(a, 0) + 1);
        return new HashSet<>(freqMap.values()).size() == freqMap.size();
    }

}
