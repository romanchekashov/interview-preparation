const { DoublyLinkedList } = require('./DoublyLinkedList');

const linkedList = new DoublyLinkedList();

linkedList.addFirst(1);
linkedList.addFirst(2);
linkedList.addFirst(3);

linkedList.add(4);
linkedList.add(5);
linkedList.add(6);

console.log([...linkedList]);

linkedList.removeFirst();
linkedList.removeLast();
console.log([...linkedList]);
