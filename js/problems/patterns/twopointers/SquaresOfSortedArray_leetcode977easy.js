const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://leetcode.com/problems/squares-of-a-sorted-array/
 *
 * 977. Squares of a Sorted Array
 *
 * Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.
 *
 * Follow up: Squaring each element and sorting the new array is very trivial, could you find an O(n) solution using a different approach?
 *
 * Complexity analysis:
 * Time complexity : O(n).
 * Space complexity : O(n).
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    let res = new Array(nums.length);
    let pLeft = 0;
    let pRight = nums.length - 1;
    let curIndex = nums.length - 1;

    while (pLeft <= pRight) {
        if (Math.abs(nums[pRight]) > Math.abs(nums[pLeft])) {
            res[curIndex--] = nums[pRight] * nums[pRight];
            pRight--;
        } else {
            res[curIndex--] = nums[pLeft] * nums[pLeft];
            pLeft++;
        }
    }

    return res;
};

const solutions = [
    sortedSquares
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([0,1,9,16,100], solution([-4,-1,0,3,10]));
        assert([4,9,9,49,121], solution([-7,-3,2,3,11]));
    });
});
