const { assert, measurePerformance } = require('./../../Utils');

/**
 * https://leetcode.com/problems/encode-and-decode-strings/
 * 659 · Encode and Decode Strings
 *
 * Design an algorithm to encode a list of strings to a string.
 * The encoded string is then sent over the network and is decoded back to the original list of strings.
 *
 * Please implement encode and decode
 */

/**
 * String - Delimiter
 * Time O(N) | Space O(1), where N - strs.length, result space doesn't counted because can be sent to write output instantly
 *
 * @param {string[]} strs
 * @return {string}
 */
var encode = function(strs) {
    let result = '';

    for (const str of strs) {
        result += str.length + '#' + str;
    }

    return result;
};

/**
 * String - Delimiter
 * Time O(N) | Space O(1), where N - str.length, result space doesn't counted because can be sent to write output instantly
 *
 * @param {string} str
 * @return {string[]}
 */
var decode = function(str) {
    const result = [];
    let left = 0, right = 0;

    while (left < str.length) {
        while (str[right++] !== '#');
        const subStrLen = parseInt(str.substring(left, right - 1));
        left = right + subStrLen; // next substring start index
        result.push(str.substring(right, left));
    }

    return result;
};

const solutions = [
    {encode, decode}
];

solutions.forEach(({encode, decode}) => {
    console.log(`Run tests for: encode, decode`);
    measurePerformance(() => {
        [["lint","code","love","you"], ["we", "say", ":", "yes"], ["we", "", ":", "yes"]].forEach(strs => {
            assert(strs, decode(encode(strs)));
        });
    });
});
