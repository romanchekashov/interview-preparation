class PrefixTrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class PrefixTrie {
    constructor() {
        this.root = new PrefixTrieNode();
    }

    // O(n) time, where n - word.length
    insert(word) {
        let currentNode = this.root;
        for (let i = 0; i < word.length; i++) {
            const currentChar = word[i];
            if (!currentNode.children[currentChar]) {
                currentNode.children[currentChar] = new PrefixTrieNode();
            }
            currentNode = currentNode.children[currentChar];
        }
        currentNode.isEnd = true;
    }

    // O(n) time, where n - word.length
    search(word) {
        let currentNode = this.root;
        for (let i = 0; i < word.length; i++) {
            const currentChar = word[i];
            if (!currentNode.children[currentChar]) {
                return false;
            }
            currentNode = currentNode.children[currentChar];
        }
        return currentNode.isEnd;
    }

    // O(n) time, where n - prefix.length
    startsWith(prefix) {
        let currentNode = this.root;
        for (let i = 0; i < prefix.length; i++) {
            const currentChar = prefix[i];
            if (!currentNode.children[currentChar]) {
                return false;
            }
            currentNode = currentNode.children[currentChar];
        }
        return true;
    }
}

module.exports = { PrefixTrieNode, PrefixTrie };

// usage example
const trie = new PrefixTrie();
trie.insert('banana');
trie.insert('bandana');
console.log(trie.search('banana')); // true
console.log(trie.search('bandana')); // true
console.log(trie.search('ban')); // false
console.log(trie.startsWith('ban')); // true
console.log(trie.startsWith('band')); // true
console.log(trie.startsWith('foo')); // false
