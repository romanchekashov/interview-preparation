https://github.com/trekhleb/javascript-algorithms
# Data Structures

* [Linked List](LinkedList)
* [Doubly Linked List](DoublyLinkedList)
* [Queue](Queue)
* [Stack](Stack)
* [Hash Table](HashTable)
* [Heap](Heap) - max and min heap versions
* [Priority Queue](PriorityQueue)
* [Trie](Trie)
* [Tree](Tree)
  * [Binary Search Tree](Tree/BinarySearchTree)
* [Graph](Graph) (both directed and undirected)

## Linked List
* In computer science, a linked list is a linear collection of data elements, in which linear order is not given by their physical placement in memory. 
* Instead, each element points to the next. 
* It is a data structure consisting of a group of nodes which together represent a sequence.

(valueFirst|head)->(value2)->(valueLast|tail)->null, where: (value)-> is node containing value and link to next node

(12)->(99)->(37)->null, where: (12) - head, (37) - tail

### Time Complexity

| Access    | Search    | Insertion | Deletion  |
| :-------: | :-------: | :-------: | :-------: |
| O(n)      | O(n)      | O(1)      | O(n)      |

### Space Complexity

O(n)

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Linked_list)
- [YouTube](https://www.youtube.com/watch?v=njTh_OwMljA&index=2&t=1s&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8)

## Doubly Linked List
* In computer science, a doubly linked list is a linked data structure that consists of a set of sequentially linked records called nodes. 
* Each node contains two fields, called links, that are references to the previous and to the next node in the sequence of nodes.
  
null<-(valueFirst|head)<->(value2)<->(valueLast|tail)->null, where: <-(value)-> is node containing value and 2 links: to previous and next node

null<-(12)<->(99)<->(37)->null, where: (12) - head, (37) - tail

### Time Complexity

| Access    | Search    | Insertion | Deletion  |
| :-------: | :-------: | :-------: | :-------: |
| O(n)      | O(n)      | O(1)      | O(n)      |

### Space Complexity

O(n)

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Doubly_linked_list)
- [YouTube](https://www.youtube.com/watch?v=JdQeNxWCguQ&t=7s&index=72&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8)
