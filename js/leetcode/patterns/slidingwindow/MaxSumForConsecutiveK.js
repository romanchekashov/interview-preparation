const { assert, measurePerformance } = require('./../../../Utils');

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * We have an array [1,2,3,2,4] and k=2, we want to return the max sum of the array with size 2.
 *
 * Complexity analysis:
 * Time complexity : O(n).
 * Space complexity : O(1).
 */
const maxSumForConsecutiveK = (array, k) => {
    if (array.length === 0 || array.length < k) {
        return 0;
    }

    let max = Number.MIN_VALUE;
    let windowSum = 0, windowStart = 0;

    for (let i = 0; i < array.length; i++) {
        windowSum += array[i];

        if (i >= k - 1) {
            if (windowSum > max) {
                max = windowSum;
            }

            windowSum -= array[windowStart++];
        }
    }

    return max;
};

const maxSumForConsecutiveK_2 = (arr, k) => {
    if (arr.length === 0 || arr.length < k) {
        return 0;
    }

    let window_sum = 0;

    /* calculate sum of 1st window */
    for (let i = 0; i < k; i++) {
        window_sum += arr[i];
    }

    let max_sum = window_sum;

    /* Start the window from the left (k instead of 0)*/
    for (let i = k; i < arr.length; i++) {
        window_sum += arr[i] - arr[i - k]; // remove the left and add the right
        max_sum = Math.max(max_sum, window_sum); // store the maximum
    }

    return max_sum;
};


const solutions = [
    maxSumForConsecutiveK,
    maxSumForConsecutiveK_2
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(6, solution([1,2,3,2,4], 2));
    });
});
