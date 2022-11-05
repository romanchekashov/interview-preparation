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

## Queue
* First-In-First-Out (FIFO) data structure.
* In a FIFO data structure, the first element added to the queue will be the first one to be removed.

()->enqueue->(back)()()()()(front)->dequeue->()

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Queue_(abstract_data_type))
- [YouTube](https://www.youtube.com/watch?v=wjI1WNcIntg&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=3&)

## Stack
In computer science, a stack is an abstract data type that serves as a collection of elements, with two principal operations:
* push, which adds an element to the collection, and
* pop, which removes the most recently added element that was not yet removed.
* The order in which elements come off a stack gives rise to its alternative name, LIFO (last in, first out).

```
()->push->(top)->pop->()
            ()
         (bottom)
```

### References
- [Wikipedia](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))
- [YouTube](https://www.youtube.com/watch?v=wjI1WNcIntg&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=3&)

## Hash Table
* In computing, a hash table (hash map) is a data structure which implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.
* Ideally, the hash function will assign each key to a unique bucket, but most hash table designs employ an imperfect hash function, which might cause hash collisions where the hash function generates the same index for more than one key. Such collisions must be accommodated in some way.

objects -> hashFunction(object) -> {hashCode1: ()->()->(), hashCode2: ()->()->()}, also need implement equals() in order to resolve hash code collision.

### References
- [Wikipedia](https://en.wikipedia.org/wiki/Hash_table)
- [YouTube](https://www.youtube.com/watch?v=shs0KM3wKv8&index=4&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8)
