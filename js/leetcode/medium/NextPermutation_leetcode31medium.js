const { assert, measurePerformance } = require('./../../Utils');

/**
 * https://leetcode.com/problems/next-permutation/
 *
 * A permutation of an array of integers is an arrangement of its members into a sequence or linear order.
 *
 * For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
 * The next permutation of an array of integers is the next lexicographically greater permutation of its integer.
 * More formally, if all the permutations of the array are sorted in one container according to their lexicographical order,
 * then the next permutation of that array is the permutation that follows it in the sorted container.
 * If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).
 *
 * For example, the next permutation of arr = [1,2,3] is [1,3,2].
 * Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
 * While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
 * Given an array of integers nums, find the next permutation of nums.
 *
 * The replacement must be in place and use only constant extra memory.
 */

/**
 * According to [Wikipedia]{@link https://en.wikipedia.org/wiki/Permutation#Generation_in_lexicographic_order},
 * a man named Narayana Pandita presented the following simple algorithm to solve this problem in the 14th century:
 *
 * 1. Find the largest index k such that nums[k] < nums[k + 1]. If no such index exists, just reverse nums and done.
 * 2. Find the largest index l > k such that nums[k] < nums[l].
 * 3. Swap nums[k] and nums[l].
 * 4. Reverse the sub-array nums[k + 1:].
 *
 * Complexity Analysis:
 *
 * Time complexity : O(n). In worst case, only two scans of the whole array are needed.
 *
 * Space complexity : O(1). No extra space is used. In place replacements are done.
 *
 * @param nums {number[]}
 * @return {number[]}
 */
var nextPermutation = function(nums) {
    const swap = (arr, p1, p2) => {
        const temp = arr[p1];
        arr[p1] = arr[p2];
        arr[p2] = temp;
    }

    const reverse = (nums, start) => {
        let i = start, j = nums.length - 1;
        while (i < j) {
            swap(nums, i, j);
            i++;
            j--;
        }
    }

    let i = nums.length - 2;
    while (i >= 0 && nums[i + 1] <= nums[i]) {
        i--;
    }
    if (i >= 0) {
        let j = nums.length - 1;
        while (nums[j] <= nums[i]) {
            j--;
        }
        swap(nums, i, j);
    }
    reverse(nums, i + 1);

    return nums;
};

const solutions = [
    nextPermutation
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([1,3,2], solution([1,2,3]));
        assert([1,2,3], solution([3,2,1]));
        assert([1,5,1], solution([1,1,5]));
        assert([2,1,3], solution([1,3,2]));
    });
});
