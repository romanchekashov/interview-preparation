const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://leetcode.com/problems/subarray-product-less-than-k/
 *
 * 713. Subarray Product Less Than K
 *
 * Given an array of integers 'nums' and an integer 'k', return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than 'k'.
 *
 * Constraints:
 * 1 <= nums.length <= 3 * 10^4
 * 1 <= nums[i] <= 1000
 * 0 <= k <= 10^6
 *
 * Complexity analysis:
 *
 * Time Complexity: O(N), where N is the length of nums. left can only be incremented at most N times.
 *
 * Space Complexity: O(1), the space used by prod, left, and ans.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function(nums, k) {
    if (k <= 1) return 0;
    let prod = 1, ans = 0, left = 0;
    for (let right = 0; right < nums.length; right++) {
        prod *= nums[right];
        while (prod >= k) prod /= nums[left++];
        ans += right - left + 1;
    }
    return ans;
};

const solutions = [
    numSubarrayProductLessThanK
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(8, solution([10,5,2,6], 100));
        assert(0, solution([1,2,3], 0));
    });
});
