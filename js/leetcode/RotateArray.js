const { assert, measurePerformance } = require('./../Utils');

/**
 * Rotate Array
 * https://leetcode.com/problems/rotate-array/
 *
 * We have to rotate the elements of the given array k times to the right.
 *
 * Brute Force
 *
 * Complexity Analysis
 * Time complexity: O(n*k). All the numbers are shifted by one step(O(n)) k times.
 * Space complexity: O(1). No extra space is used
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    k %= nums.length;
    while (k-- > 0) {
        for (let i = nums.length - 2; i >= 0; i--) {
            let temp = nums[i + 1];
            nums[i + 1] = nums[i];
            nums[i] = temp;
        }
    }
};

/**
 * Using Reverse
 * This approach is based on the fact that when we rotate the array k times,
 * k elements from the back end of the array come to the front and the rest of the elements from the front shift backwards.
 * In this approach, we firstly reverse all the elements of the array.
 * Then, reversing the first k elements followed by reversing the rest n−k elements gives us the required result.
 *
 * Let n = 7 and k = 3:
 * Original List                   : 1 2 3 4 5 6 7
 * After reversing all numbers     : 7 6 5 4 3 2 1
 * After reversing first k numbers : 5 6 7 4 3 2 1
 * After revering last n-k numbers : 5 6 7 1 2 3 4 --> Result
 *
 * Complexity Analysis
 * Time complexity: O(n). n elements are reversed a total of three times.
 * Space complexity: O(1). No extra space is used.
 *
 * @param {*} nums
 * @param {*} k
 */
function rotateBest(nums, k) {
    k %= nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);

    function reverse(nums, start, end) {
        while (start < end) {
            let temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
}

const solutions = [rotate, rotateBest];

solutions.forEach((solution) => {
    console.log(`Run tests for: [${solution.name}]`);
    measurePerformance(() => {
        var nums = [1, 2, 3, 4, 5, 6, 7];
        solution(nums, 3);
        assert([5, 6, 7, 1, 2, 3, 4], nums);

        nums = [-1, -100, 3, 99];
        solution(nums, 2);
        assert([3, 99, -1, -100], nums);
    });
});
