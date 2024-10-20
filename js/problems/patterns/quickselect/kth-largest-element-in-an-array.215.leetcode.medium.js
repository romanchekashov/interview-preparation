const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://leetcode.com/problems/kth-largest-element-in-an-array/
 * 215. Kth Largest Element in an Array
 *
 * Given an integer array 'nums' and an integer 'k', return the 'k-th' largest element in the array.
 * Note that it is the 'k-th' largest element in the sorted order, not the 'k-th' distinct element.
 * You must solve it in 'O(n)' time complexity.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    const swap = (nums, i, j) => [nums[i], nums[j]] = [nums[j], nums[i]]

    /**
     * @param {number[]} nums
     * @param {number} low - first index
     * @param {number} high - last index
     * @param {number} k
     * @return {number}
     */
    const quickSelect = (nums, low, high, k) => {
        let pivot = low;

        // use quick sort's idea
        // put nums that are <= pivot to the left
        // put nums that are  > pivot to the right
        for (let j = low; j < high; j++) {
            if (nums[j] <= nums[high]) {
                swap(nums, pivot++, j);
            }
        }
        swap(nums, pivot, high);

        // count the nums that are > pivot from high
        const count = high - pivot + 1;
        // pivot is the one!
        if (count === k) return nums[pivot];
        // pivot is too small, so it must be on the right
        if (count > k) return quickSelect(nums, pivot + 1, high, k);
        // pivot is too big, so it must be on the left
        return quickSelect(nums, low, pivot - 1, k - count);
    }

    return quickSelect(nums, 0, nums.length - 1, k);
};

const solutions = [
    findKthLargest
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(5, solution([3,2,1,5,6,4], 2));
        assert(4, solution([3,2,3,1,2,4,5,5,6], 4));
    });
});
