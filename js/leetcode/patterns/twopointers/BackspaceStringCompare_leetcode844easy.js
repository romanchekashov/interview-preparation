const { assert, measurePerformance } = require('./../../../Utils');

/**
 * https://leetcode.com/problems/backspace-string-compare/
 *
 * 844. Backspace String Compare
 *
 * Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.
 *
 * Note that after backspacing an empty text, the text will continue empty.
 *
 * Follow up: Can you solve it in O(n) time and O(1) space?
 *
 * Two Pointer
 *
 * Intuition:
 * When writing a character, it may or may not be part of the final string depending on how many backspace keystrokes occur in the future.
 *
 * If instead we iterate through the string in reverse, then we will know how many backspace characters we have seen, and therefore whether the result includes our character.
 *
 * Algorithm:
 * Iterate through the string in reverse. If we see a backspace character, the next non-backspace character is skipped. If a character isn't skipped, it is part of the final answer.
 *
 * Complexity analysis:
 * Time complexity: O(M + N), where M, N are the lengths of 's' and 't' respectively.
 * Space complexity: O(1).
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function(s, t) {
    let i = s.length - 1, j = t.length - 1;
    let skipS = 0, skipT = 0;

    while (i >= 0 || j >= 0) { // While there may be chars in build(S) or build (T)
        while (i >= 0) { // Find position of next possible char in build(S)
            if (s[i] === '#') {skipS++; i--;}
            else if (skipS > 0) {skipS--; i--;}
            else break;
        }
        while (j >= 0) { // Find position of next possible char in build(T)
            if (t[j] === '#') {skipT++; j--;}
            else if (skipT > 0) {skipT--; j--;}
            else break;
        }
        // If two actual characters are different
        if (i >= 0 && j >= 0 && s[i] !== t[j])
            return false;
        // If expecting to compare char vs nothing
        if ((i >= 0) !== (j >= 0))
            return false;
        i--; j--;
    }
    return true;
};

const solutions = [
    backspaceCompare
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(true, solution("ab#c", "ad#c"));
        assert(true, solution("ab##", "c#d#"));
        assert(false, solution("a#c", "b"));
    });
});
