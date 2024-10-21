const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://leetcode.com/problems/valid-parentheses/
 *
 * 20. Valid Parentheses
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 *
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 *
 * Complexity analysis:
 * Time complexity : O(n).
 * Space complexity : O(n).
 *
 * @param {string} s
 * @return {boolean}
 */
// O(n) time | O(n) space
var isValid = function(s) {
    const stack = [];
    const closeToOpen = { ')': '(', ']': '[', '}': '{' };
    
    for (const c of s) {
        if (closeToOpen[c]) {
            if (stack[stack.length - 1] === closeToOpen[c]) {
                stack.pop();
            } else {
                return false;
            }
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
};

const solutions = [
    isValid
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(true, solution('()'));
        assert(true, solution('()[]{}'));
        assert(false, solution('(]'));
        assert(true, solution('([])'));
    });
});
