const { assert, measurePerformance } = require('./../../Utils');

/**
 * https://leetcode.com/problems/majority-element/
 * 169. Majority Element
 *
 * Given an array nums of size n, return the majority element.
 *
 * The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
 *
 * Follow-up: Could you solve the problem in linear time and in O(1) space?
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    nums.sort()
    return nums[Math.floor(nums.length / 2)]
};

/**
 * Boyer-Moore Majority Vote Algorithm
 * http://www.cs.utexas.edu/~moore/best-ideas/mjrty/
 *
 * Follow-up: Could you solve the problem in linear time and in O(1) space?
 *
 * @param {number[]} nums
 * @return {number}
 */
var majorityElementCounter = function(nums) {
    let count = 0, major = 0;
    for (const num of nums) {
        if (count === 0)
            major = num;
        if (num !== major)
            count--;
        else
            count++;
    }
    return major;
};

const solutions = [
    majorityElement,
    majorityElementCounter
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(3, solution([3,2,3]));
        assert(2, solution([2,2,1,1,1,2,2]));
    });
});
