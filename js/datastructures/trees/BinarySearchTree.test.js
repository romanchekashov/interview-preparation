const { BinarySearchTree } = require('./BinarySearchTree');

const bst = new BinarySearchTree();

bst.add(11);
bst.add(6);
bst.add(3);
bst.add(1);
bst.add(5);
bst.add(8);
bst.add(15);
bst.add(13);
bst.add(17);
bst.add(12);
bst.add(14);
bst.add(19);

console.log('pre-order traversal:', [...bst.preOrderTraversal()]);
// 11,  6,  3,  1,  5, 8, 15, 13, 12, 14, 17, 19

console.log('in-order traversal:', [...bst]);
// 1,  3,  5,  6,  8, 11, 12, 13, 14, 15, 17, 19
// with a BST the values printed by the inorder traversal are in increasing order!

console.log('post-order traversal:', [...bst.postOrderTraversal()]);
// 1,  5,  3,  8,  6, 12, 14, 13, 19, 17, 15, 11

console.log('level-order traversal:', [...bst.levelOrderTraversal()]);
// 11,  6, 15, 3,  8, 13, 17,  1, 5, 12, 14, 19
