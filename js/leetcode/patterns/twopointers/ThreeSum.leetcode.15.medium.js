const { assert, measurePerformance } = require('./../../../Utils');

/**
 * https://leetcode.com/problems/3sum/
 *
 * 15. 3Sum
 *
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 *
 * Notice that the solution set must not contain duplicate triplets.
 *
 * Constraints:
 * 3 <= nums.length <= 3000
 * -10^5 <= nums[i] <= 10^5
 *
 * Complexity analysis:
 * Time complexity : O(n^2).
 * Space complexity : O(1), because result array doesn't count(maybe printout to output directly)
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const res = [];

    // Merge sort: O(n * log(n))
    nums.sort((a, b) => a - b);

    // O(n^2)
    for (let i = 0; i < nums.length - 2; i++) {
        // check only if current and previous numbers are different
        if(i === 0 || nums[i - 1] !== nums[i]) {
            let start = i + 1, end = nums.length - 1;
            while (start < end) {
                const sum = nums[i] + nums[start] + nums[end];

                if (sum === 0) {
                    res.push([nums[i], nums[start], nums[end]]);

                    // increase while next and previous numbers are different
                    while(start < end && nums[start] === nums[start + 1])
                        start++;

                    // decrease while next and previous numbers are different
                    while(start < end && nums[end] === nums[end - 1])
                        end--;

                    start++;
                    end--;
                } else if (sum > 0) {
                    end--;
                } else {
                    start++;
                }
            }
        }
    }

    return res;
};

const solutions = [
    threeSum
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([[-1,-1,2],[-1,0,1]], solution([-1,0,1,2,-1,-4]));
        assert([], solution([0,1,1]));
        assert([[0,0,0]], solution([0,0,0]));
    });
});
