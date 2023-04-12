class SuffixTrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class SuffixTrie {
    constructor(text) {
        this.root = new SuffixTrieNode();
        this.construct(text);
    }

    // O(((a1 + an) / 2) * n) - the sum of an arithmetic progression, where n - text.length
    // for O(n) time look Ukkonen's algorithm which is more complex
    // worst O(n ^ 2) space complexity, for example for text: aaabbb, aaaaaabbbbbb and similar.
    construct(text) {
        let __counter = 0;
        for (let i = 0; i < text.length; i++) {
            let currentNode = this.root;
            for (let j = i; j < text.length; j++) {
                const currentChar = text[j];
                if (!currentNode.children[currentChar]) {
                    currentNode.children[currentChar] = new SuffixTrieNode();
                }
                currentNode = currentNode.children[currentChar];
                __counter++;
            }
            currentNode.isEnd = true;
        }
        console.log(`construct suffix tree for (text = ${text}, len = ${text.length}) took ${__counter} calls`)
    }

    // O(n) time, where n - pattern.length
    searchSuffix(pattern) {
        let currentNode = this.root;
        for (let i = 0; i < pattern.length; i++) {
            const currentChar = pattern[i];
            if (!currentNode.children[currentChar]) {
                return false;
            }
            currentNode = currentNode.children[currentChar];
        }
        // console.log('search', pattern, currentNode)
        return currentNode.isEnd;
    }

    // O(n) time, where n - pattern.length
    contains(pattern) {
        let currentNode = this.root;
        for (let i = 0; i < pattern.length; i++) {
            const currentChar = pattern[i];
            if (!currentNode.children[currentChar]) {
                return false;
            }
            currentNode = currentNode.children[currentChar];
        }
        // console.log('contains', pattern, currentNode)
        return true;
    }
}

module.exports = { SuffixTrieNode, SuffixTrie };

// usage example
const trie = new SuffixTrie('banana');
console.log(trie.searchSuffix('an')); // false
console.log(trie.searchSuffix('nan')); // false
console.log(trie.searchSuffix('nana')); // true

console.log(trie.contains('an')); // true
console.log(trie.contains('nan')); // true
console.log(trie.contains('nana')); // true
