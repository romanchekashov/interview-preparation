const { assert, measurePerformance } = require('../../../Utils');

/**
 * 720. Longest Word in Dictionary
 * https://leetcode.com/problems/longest-word-in-dictionary/
 *
 * @param words
 */
var longestWord = function(words) {
    class Node {
        keys = new Map()
        end = false
    }

    class Trie {
        root = new Node()

        add(input, node = this.root, count = 1) {
            if (input.length === 0) {
                node.end = true;
                return count;
            }

            const currentNode = node.keys.get(input[0])

            if (!currentNode) {
                node.keys.set(input[0], new Node())
            } else if (currentNode.end) {
                count++;
            }

            return this.add(input.substr(1), node.keys.get(input[0]), count)
        }
    }

    words.sort();

    let maxCount = 0;
    let maxWord = '';
    const trie = new Trie()

    for (const word of words) {
        const count = trie.add(word);

        if (word.length === count) {
            if (count > maxCount) {
                maxWord = word
                maxCount = count
            } else if (count === maxCount && word < maxWord) {
                maxWord = word
            }
        }

        // console.log(word, count, maxWord, maxCount)
    }

    return maxWord
}

/**
 * Time complexity: O(N * LogN)
 * Space complexity: O(N)
 *
 * @param words
 * @return {string}
 */
var longestWordWithoutTrie = function(words) {
    words.sort()

    const prefixes = new Set()
    let res = ''

    for (const word of words) {
        if (word.length === 1 || prefixes.has(word.substring(0, word.length - 1))) {
            res = ((word.length > res.length) || (word.length === res.length && word < res)) ? word : res
            prefixes.add(word)
        }
    }

    return res
}

/**
 * TODO: Doesn't work need investigate!
 * @param words
 * @return {string}
 */
var longestWordWithTrie = function(words) {
    class Node {
        keys = new Map()
        end = 0
    }

    class Trie {
        root = new Node()

        add(word, index) {
            let cur = this.root

            for (let i = 0; i < word.length; i++) {
                if (!cur.keys.has(word[i])) {
                    cur.keys.set(word[i], new Node())
                }
                cur = cur.keys.get(word[i])
            }

            cur.end = index
        }
    }

    // create and fill trie
    const trie = new Trie()
    words.forEach((word, index) => trie.add(word, index + 1))

    let ans = ''
    // depth-first-search
    const stack = [...trie.root.keys.values()];

    while (stack.length > 0) {
        const currentNode = stack.pop();
        if (currentNode.end > 0) {
            const word = words[currentNode.end - 1];
            // console.log(word)

            if (word.length > ans.length || word.length === ans.length && word < ans) {
                ans = word;
            }
        }

        for (const node of currentNode.keys.values()) {
            stack.push(node)
        }
    }

    return ans
}

const solutions = [
    longestWord,
    longestWordWithoutTrie,
    longestWordWithTrie
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        // assert("world", solution(["w","wo","wor","worl","world"]));
        assert("apple", solution(["a","banana","app","appl","ap","apply","apple"]));
        // assert("eyj", solution(["ogz","eyj","e","ey","hmn","v","hm","ogznkb","ogzn","hmnm","eyjuo","vuq","ogznk","og","eyjuoi","d"]));
    });
});
