const { assert, measurePerformance } = require('./../../Utils');

/**
 * Hi-Tech Talents - assesment problem from leetcode
 * https://www.hitechtalents.com/
 *
 * @param word
 * @return {number}
 * @constructor
 */
function LongestVowelSubstring(word) {
    let count = 0, res = 0;
    const weight = {
        a: 5,
        e: 4,
        i: 3,
        o: 2,
        u: 1
    };
    let used = new Set();

    let prev = weight[word.charAt(0)];

    for(let i = 0; i < word.length; i++) {
        const char = word.charAt(i);

        if (weight[char] && prev && weight[char] <= prev) {
            used.add(weight[char]);
            count++;
        } else {
            if (used.size === 5) {
                res = Math.max(res, count);
            }

            used = new Set();
            used.add(weight[char]);
            count = 1;
        }

        prev = weight[char];
    }

    if (used.size === 5) {
        res = Math.max(res, count);
    }

    return res < 5 ? 0 : res;
}

function LongestVowelSubstring2(word) {
    let count = 0, res = 0;
    let used = new Set();
    let prev = word.charAt(0);

    for(let i = 0; i < word.length; i++) {
        const char = word.charAt(i);

        if (prev && char >= prev) {
            used.add(char);
            count++;
        } else {
            if (used.size === 5) {
                res = Math.max(res, count);
            }

            used = new Set();
            used.add(char);
            count = 1;
        }

        prev = char;
    }

    if (used.size === 5) {
        res = Math.max(res, count);
    }

    return res < 5 ? 0 : res;
}

function LongestVowelSubstring3(word) {
    let count = 0, res = 0;
    let uniqueChars = 1;
    let prev = word.charAt(0);

    for(let i = 0; i < word.length; i++) {
        const char = word.charAt(i);

        if (prev && char >= prev) {
            uniqueChars += char > prev ? 1 : 0;
            count++;
        } else {
            if (uniqueChars === 5) {
                res = Math.max(res, count);
            }

            uniqueChars = 1;
            count = 1;
        }

        prev = char;
    }

    if (uniqueChars === 5) {
        res = Math.max(res, count);
    }

    return res < 5 ? 0 : res;
}

function LongestVowelSubstring4(word) {
    let cnt = 1;
    let len = 1;
    let max_len = 0;

    for (let i = 1; i !== word.length; ++i) {
        if (word[i - 1] === word[i]) {
            ++len;
        } else if (word[i - 1] < word[i]) {
            ++len;
            ++cnt;
        } else {
            cnt = 1;
            len = 1;
        }

        if (cnt === 5) {
            max_len = Math.max(max_len, len);
        }
    }

    return max_len;
}

const solutions = [
    LongestVowelSubstring,
    LongestVowelSubstring2,
    LongestVowelSubstring3,
    LongestVowelSubstring4
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(13, solution('aeiaaioaaaaeiiiiouuuooaauuaeiu'));
        assert(5, solution('aeeeiiiioooauuuaeiou'));
        assert(0, solution('a'));
        assert(0, solution('aaaaa'));
        assert(8, solution('aiaeioouaaeeiouuiuieeo'));
    });
});
