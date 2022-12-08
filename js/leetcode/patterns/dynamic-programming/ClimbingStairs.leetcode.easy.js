const { assert, measurePerformance } = require('./../../../Utils');

/**
 * https://leetcode.com/problems/climbing-stairs/
 * 70. Climbing Stairs
 *
 * You are climbing a staircase. It takes 'n' steps to reach the top.
 *
 * Each time you can either climb '1' or '2' steps. In how many distinct ways can you climb to the top?
 *
 * Testcase 1:
 * Input: n = 2
 * Output: 2
 * Explanation: There are two ways to climb to the top.
 * 1. 1 step + 1 step
 * 2. 2 steps
 *
 * Testcase 2:
 * Input: n = 3
 * Output: 3
 * Explanation: There are three ways to climb to the top.
 * 1. 1 step + 1 step + 1 step
 * 2. 1 step + 2 steps
 * 3. 2 steps + 1 step
 */

/**
 * a[n] = a[n - 1] + a[n - 2], where 'a' is number of ways to climb to 'n' staircase
 *
 * Time complexity : O(n)
 * Space complexity : O(1)
 *
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n === 1 || n === 2) {
        return n;
    }

    let a1 = 1;
    let a2 = 2;

    while (n-- > 2) {
        let an = a1 + a2;
        a1 = a2;
        a2 = an;
    }

    return a2;
};

const solutions = [
    climbStairs
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(2, solution(2));
        assert(3, solution(3));
    });
});
