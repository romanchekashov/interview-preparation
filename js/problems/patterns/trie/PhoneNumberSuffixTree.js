const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://www.youtube.com/watch?v=PIeiiceWe_w
 *
 * 2 === a,b,c
 * 3 === d,e,f
 * 4 === g,h,i
 * 5 === j,k,l
 * 6 === m,n,o
 * 7 === p,q,r,s
 * 8 === t,u,v
 * 9 === w,x,y,z
 */

/**
 * Time: O( (((a1 + an) / 2) * n) + (m * w) ), where n - length of phone number, m - words length, w - each word length
 * Space: O(n ^ 2) - suffix tree store + O(dic.length)
 *
 * @param {string} phoneNumber
 * @param {string[]} words
 * @return {string[]} words which contains in phoneNumber
 */
var phoneNumberSuffixTree = function(phoneNumber, words) {
    const dic = {
        'a': 2, 'b': 2, 'c': 2,
        'd': 3, 'e': 3, 'f': 3,
        'g': 4, 'h': 4, 'i': 4,
        'j': 5, 'k': 5, 'l': 5,
        'm': 6, 'n': 6, 'o': 6,
        'p': 7, 'q': 7, 'r': 7, 's': 7,
        't': 8, 'u': 8, 'v': 8,
        'w': 9, 'x': 9, 'y': 9, 'z': 9
    };

    const suffixTreeRoot = {children: {}, isEnd: false};

    // O((a1 + an) * n / 2) - the sum of an arithmetic progression, where n - phoneNumber.length
    // O(n ^ 2) space in worst case, example: 111222
    for (let i = 0; i < phoneNumber.length; i++) { // fill suffix tree
        let node = suffixTreeRoot;
        for (let j = i; j < phoneNumber.length; j++) {
            const symbol = phoneNumber[j]
            if (!node.children[symbol]) {
                node.children[symbol] = {children: {}, isEnd: false};
            }
            node = node.children[symbol];
        }
        node.isEnd = true;
    }

    // O(words.length * words[i..n].length) time
    return words.reduce((acc, cur) => {
        let node = suffixTreeRoot;

        for (let i = 0; i < cur.length; i++) {
            const symbol = '' + dic[cur[i]];
            if (!node.children[symbol]) return acc;
            node = node.children[symbol];
        }

        acc.push(cur);
        return acc;
    }, []);
};

const solutions = [
    phoneNumberSuffixTree
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(['bar', 'cap', 'car', 'emo', 'foo', 'foobar'], solution('3662277', ['foo', 'bar', 'baz', 'foobar', 'emo', 'cap', 'car', 'cat']), false);
    });
});
