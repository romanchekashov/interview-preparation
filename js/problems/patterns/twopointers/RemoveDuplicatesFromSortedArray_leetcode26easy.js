const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 *
 * Input: nums = [1,1,2]
 * Output: 2, nums = [1,2,_]
 * Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
 * It does not matter what you leave beyond the returned k (hence they are underscores).
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let left = 0;
    let right = 1;
    let needSwap = false;

    while (right < nums.length) {
        if (nums[left] !== nums[right]) {
            left++;

            if (needSwap) {
                nums[left] = nums[right];
            }

            right++;
            needSwap = right - left > 1;
        } else if (nums[left] === nums[right]) {
            right++;
            needSwap = true;
        }
    }

    return left + 1;
};

/**
 * Complexity analysis:
 * Time complexity : O(n). Assume that n is the length of array. Each of i and j traverses at most n steps.
 * Space complexity : O(1).
 */
var removeDuplicatesLeetCodeSolution = function(nums) {
    if (nums.length === 0) return 0;

    let i = 0;

    for (let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }

    return i + 1;
};

const solutions = [
    removeDuplicates,
    removeDuplicatesLeetCodeSolution
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        let arr = [1,1,2];
        assert(2, solution(arr));
        assert([1, 2], arr);

        arr = [1,1,2,3];
        assert(3, solution(arr));
        assert([1,2,3], arr);

        assert(5, solution([0,0,1,1,1,2,2,3,3,4]));
        assert(2, solution([1,2]));
    });
});
