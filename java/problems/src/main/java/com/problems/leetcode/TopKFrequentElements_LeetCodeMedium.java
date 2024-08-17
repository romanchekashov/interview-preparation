package com.problems.leetcode;

import com.problems.AbsLeetCodeSolution;

import java.util.*;

public class TopKFrequentElements_LeetCodeMedium extends AbsLeetCodeSolution {

    public static void main(String[] args) {
        new TopKFrequentElements_LeetCodeMedium().executeTests();
    }

    @Override
    public void tests() {
        System.out.println(Arrays.toString(topKFrequent(new int[]{1,1,1,2,2,3}, 2)));
        System.out.println(Arrays.toString(topKFrequent(new int[]{6,0,1,4,9,7,-3,1,-4,-8,4,-7,-3,3,2,-3,9,5,-4,0}, 6)));

        System.out.println(Arrays.toString(topKFrequent2(new int[]{1,1,1,2,2,3}, 2)));
        System.out.println(Arrays.toString(topKFrequent2(new int[]{6,0,1,4,9,7,-3,1,-4,-8,4,-7,-3,3,2,-3,9,5,-4,0}, 6)));
    }

    // use maxHeap. Put entry into maxHeap so we can always poll a number with largest frequency
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        for(int n: nums){
            map.put(n, map.getOrDefault(n,0)+1);
        }

        PriorityQueue<Map.Entry<Integer, Integer>> maxHeap =
                new PriorityQueue<>((a,b)->(b.getValue()-a.getValue()));
        for(Map.Entry<Integer,Integer> entry: map.entrySet()){
            maxHeap.add(entry);
        }

        int[] res = new int[k];
        int index = 0;

        while(index < k) {
            Map.Entry<Integer, Integer> entry = maxHeap.poll();
            res[index++] = entry.getKey();
        }
        return res;
    }

    private int getNumberOrDefault(Map<Integer, Integer> map, int key) {
        if (map.get(key) == null) {
            return Integer.MIN_VALUE;
        }

        return map.get(key);
    }

    public int[] topKFrequent2(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        for(int n: nums){
            map.put(n, map.getOrDefault(n,0)+1);
        }

        int[] maxHeap = new int[k];
        Arrays.fill(maxHeap, Integer.MIN_VALUE);

        for (Map.Entry<Integer, Integer> entry: map.entrySet()) {
            if (getNumberOrDefault(map, maxHeap[k - 1]) < map.get(entry.getKey())) {
                maxHeap[k - 1] = entry.getKey();

                int idx = k - 1;

                while (idx > 0 && getNumberOrDefault(map, maxHeap[idx - 1]) < getNumberOrDefault(map, maxHeap[idx])) {
                    int temp = maxHeap[idx - 1];
                    maxHeap[idx - 1] = maxHeap[idx];
                    maxHeap[idx] = temp;
                    idx--;
                }
            }
        }

        return maxHeap;
    }

}
