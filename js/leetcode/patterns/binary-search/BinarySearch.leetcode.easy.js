const { assert, measurePerformance } = require('./../../../Utils');

/**
 * https://leetcode.com/problems/binary-search/
 * 704. Binary Search
 *
 * Given an array of integers 'nums' which is sorted in ascending order, and an integer 'target', write a function to search 'target' in 'nums'. If 'target' exists, then return its index. Otherwise, return '-1'.
 *
 * You must write an algorithm with 'O(log n)' runtime complexity.
 *
 *
 * Example 1:
 * Input: nums = [-1,0,3,5,9,12], target = 9
 * Output: 4
 * Explanation: 9 exists in nums and its index is 4
 *
 * Example 2:
 * Input: nums = [-1,0,3,5,9,12], target = 2
 * Output: -1
 * Explanation: 2 does not exist in nums so return -1
 */

/**
 *
 * Time complexity : O(log(n)), where 'n' - nums.length
 * Space complexity : O(1)
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (target > nums[mid]) {
            left = mid + 1;
        } else if (target < nums[mid]) {
            right = mid - 1
        } else {
            return mid;
        }
    }

    return -1;
};

const solutions = [
    search
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(4, solution([-1,0,3,5,9,12], 9));
        assert(-1, solution([-1,0,3,5,9,12], 2));
    });
});
