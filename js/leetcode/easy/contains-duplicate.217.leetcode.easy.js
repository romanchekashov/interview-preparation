const { assert, measurePerformance } = require('./../../Utils');

/**
 * https://leetcode.com/problems/contains-duplicate/
 * 217. Contains Duplicate
 *
 * Given an integer array 'nums', return 'true' if any value appears at least twice in the array, and return 'false' if every element is distinct.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    const map = {};
    return nums.some(item => {
        if (map[item]) return true
        map[item] = true
    })
};

const solutions = [
    containsDuplicate
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(true, solution([1,2,3,1]));
        assert(false, solution([1,2,3,4]));
        assert(true, solution([1,1,1,3,3,4,3,2,4,2]));
    });
});
