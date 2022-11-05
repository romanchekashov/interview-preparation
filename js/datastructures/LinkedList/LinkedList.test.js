const { LinkedList } = require('./LinkedList');

const linkedList = new LinkedList();

linkedList.prepend(1);
linkedList.prepend(2);
linkedList.prepend(3);

linkedList.append(4);
linkedList.append(5);
linkedList.append(6);

console.log([...linkedList]);

linkedList.deleteHead();
linkedList.deleteTail();
console.log([...linkedList]);
