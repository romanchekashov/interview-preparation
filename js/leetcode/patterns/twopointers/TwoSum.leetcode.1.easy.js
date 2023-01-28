const { assert, measurePerformance } = require('./../../../Utils');

/**
 * https://leetcode.com/problems/two-sum/
 *
 * 1. Two Sum
 *
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * You can return the answer in any order.
 */

/**
 * Complexity analysis:
 * Time complexity : O(n^2).
 * Space complexity : O(1).
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for (let i = 0, LEN = nums.length - 1; i < LEN; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) return [i, j];
        }
    }

    return null;
};

/**
 * Follow-up: Can you come up with an algorithm that is less than O(n^2) time complexity?
 *
 * Complexity analysis:
 * Time complexity : O(n).
 * Space complexity : O(n).
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum2 = function(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        if (map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i]
        }
        map.set(nums[i], i);
    }

    return null;
};

/**
 * Follow-up: Can you come up with an algorithm that is less than O(n^2) time complexity?
 *
 * Complexity analysis:
 * Time complexity : O(n * log(n)).
 * Space complexity : O(n).
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum2Pointers = function(nums, target) {
    // O(n)
    const numIndexMap = nums.reduce((acc, cur, curIndex) => {
        if (acc.has(cur)) {
            acc.set(cur, [acc.get(cur), curIndex]);
        } else {
            acc.set(cur, curIndex);
        }
        return acc;
    }, new Map());

    // Merge sort: O(n * log(n))
    nums.sort((a, b) => a - b);

    let start = 0, end = nums.length - 1;
    while (start < end) {
        const sum = nums[start] + nums[end];

        if (sum === target) {
            return Array.isArray(numIndexMap.get(nums[start])) ? numIndexMap.get(nums[start]) : [numIndexMap.get(nums[start]), numIndexMap.get(nums[end])];
        } else if (sum > target) {
            end--;
        } else {
            start++;
        }
    }

    return null;
};

const solutions = [
    twoSum,
    twoSum2,
    twoSum2Pointers
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([0,1], solution([2,7,11,15], 9));
        assert([1,2], solution([3,2,4], 6));
        assert([0,1], solution([3,3], 6));
    });
});
