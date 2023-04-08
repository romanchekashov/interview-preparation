const { assert, measurePerformance } = require('../../../Utils');
const { BST } = require('./BST');

const bst = new BST();

bst.add(4);
bst.add(2);
bst.add(6);
bst.add(1);
bst.add(3);
bst.add(5);
bst.add(7);
bst.remove(4);

console.log(bst.findMin())
console.log(bst.findMax())
bst.remove(7);
console.log(bst.findMax())
console.log(bst.isPresent(4))

// balanced
const bst2 = new BST();

bst2.add(9);
bst2.add(4);
bst2.add(17);
bst2.add(3);
bst2.add(6);
bst2.add(22);
bst2.add(5);
bst2.add(7);
bst2.add(20);

console.log(bst2.findMinHeight())
console.log(bst2.findMaxHeight())
console.log(bst2.isBalanced())
bst2.add(10);
console.log(bst2.findMinHeight())
console.log(bst2.findMaxHeight())
console.log(bst2.isBalanced())
console.log('inOrder: ' + bst2.inOrder())
console.log('inOrderWithStack: ' + bst2.inOrderWithStack())
console.log('preOrder: ' + bst2.preOrder())
console.log('postOrder: ' + bst2.postOrder())
console.log('levelOrder: ' + bst2.levelOrder())

assert([3,4,5,6,7,9,10,17,20,22], bst2.inOrder());
assert([3,4,5,6,7,9,10,17,20,22], bst2.inOrderWithStack());
