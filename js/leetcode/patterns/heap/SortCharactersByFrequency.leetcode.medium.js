const { assert, measurePerformance } = require('./../../../Utils');

/**
 * https://leetcode.com/problems/sort-characters-by-frequency/
 * 451. Sort Characters By Frequency
 *
 * Given a string s, sort it in decreasing order based on the frequency of the characters.
 * The frequency of a character is the number of times it appears in the string.
 *
 * Return the sorted string. If there are multiple answers, return any of them.
 *
 * Testcase 1:
 * Input: s = "tree"
 * Output: "eert"
 * Explanation: 'e' appears twice while 'r' and 't' both appear once.
 * So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
 *
 * Testcase 2:
 * Input: s = "cccaaa"
 * Output: "aaaccc"
 * Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
 * Note that "cacaca" is incorrect, as the same characters must be together.
 *
 * Testcase 3:
 * Input: s = "Aabb"
 * Output: "bbAa"
 * Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
 * Note that 'A' and 'a' are treated as two different characters.
 */

// maxHeap.push(key);
//
// if (maxHeap.length > 1) {
//     let idx = 1;
//     while (idx < maxHeap.length && map[maxHeap[idx - 1]] < map[maxHeap[idx]]) {
//         [maxHeap[idx - 1], maxHeap[idx]] = [maxHeap[idx], maxHeap[idx - 1]];
//         idx++;
//     }
// }

/**
 *
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
    const map = new Map();

    for (let i = 0; i < s.length; i++) {
        map.set(s[i], (map.get(s[i]) ?? 0) + 1);
    }

    const bucket = [];
    for (const [k, v] of map.entries()) {
        if (!bucket[v]) {
            bucket[v] = new Set();
        }

        bucket[v].add(k);
    }

    let result = "";
    for(let i = bucket.length - 1; i >= 0; i--) {
        if (bucket[i]) {
            for (const ch of bucket[i]) {
                let j = i;
                while (j-- > 0) {
                    result += ch;
                }
            }
        }
    }

    return result;
};

var frequencySort2 = function(s) {

    const charMap = s.split('').reduce((acc, cur) => {acc[cur] = (acc[cur] || 0) + 1; return acc} , {})

    const sortedArr = Object.keys(charMap).sort((a, b) => charMap[b] - charMap[a]);

    return sortedArr.reduce((acc, cur) => acc + cur.repeat(charMap[cur]) ,'')
};

const solutions = [
    frequencySort,
    frequencySort2
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert("eert", solution("tree"));
        assert("aaaccc", solution("cccaaa"));
        assert("bbAa", solution("Aabb"));
    });
});
