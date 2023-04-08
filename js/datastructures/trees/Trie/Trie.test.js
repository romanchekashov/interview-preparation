const { Trie } = require('./Trie');

const trie = new Trie();

trie.add('ball');
trie.add('bat');
trie.add('doll');
trie.add('dork');
trie.add('do');
trie.add('dorm');
trie.add('send');
trie.add('sense');

console.log(trie.isWord('doll'));
console.log(trie.isWord('dor'));
console.log(trie.isWord('dorf'));
console.log(trie.print());
