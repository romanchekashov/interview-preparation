- https://github.com/trekhleb/javascript-algorithms
- https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
- https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions-set-2/
- https://github.com/williamfiset/Algorithms

# Data Structures

* [Linked List](linear/LinkedList)
* [Doubly Linked List](linear/DoublyLinkedList)
* [Queue](Queue)
* [Stack](linear/Stack)
* [Hash Table](HashTable)
* [Heap](Heap) - max and min heap versions
* [Priority Queue](PriorityQueue)
* [Trie](Trie)
* [Tree](Tree)
  * [Binary Search Tree](Tree/BinarySearchTree)
* [Graph](Graph) (both directed and undirected)
* [Disjoint Set](UnionFind)

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

## Heap
* In computer science, a heap is a specialized tree-based data structure that satisfies the heap property described below.

* In a **MIN HEAP**, if P is a parent node of C, then the key (the value) of P is less than or equal to the key of C.
**The minimum element of the heap is always on top as a root of the heap.**
* In a **MAX HEAP**, the key of P is greater than or equal to the key of C. 
**The maximum element of the heap is always on top as a root of the heap.**
```
      8   <-- Root of tree -->   0
  7       6                  2       3
3   2   5                  4   5   6   4
  Max Heap                    Min Heap
```
### Array representation of a heap
* LeftChildIndex = 2 * ParentIndex + 1
* RightChildIndex = 2 * ParentIndex + 2

[100, 19, 36, 17, 3, 25, 1, 2, 7]

* The node at the "top" of the heap with no parents is called the root node.

### References
- [Wikipedia](https://en.wikipedia.org/wiki/Heap_(data_structure))
- [YouTube](https://www.youtube.com/watch?v=t0Cq6tVNRBA&index=5&t=0s&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8)

## Priority Queue
* In computer science, a priority queue is an abstract data type which is like a regular queue or stack data structure, but where additionally each element has a "priority" associated with it. In a priority queue, an element with high priority is served before an element with low priority. If two elements have the same priority, they are served according to their order in the queue.
* While priority queues are often implemented with heaps, they are conceptually distinct from heaps. A priority queue is an abstract concept like "a list" or "a map"; just as a list can be implemented with a linked list or an array, a priority queue can be implemented with a heap or a variety of other methods such as an unordered array.
* It is the same as min heap except that when comparing two elements we take into account its priority instead of the element's value.

### References
- [Wikipedia](https://en.wikipedia.org/wiki/Priority_queue)
- [YouTube](https://www.youtube.com/watch?v=wptevk0bshY&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=6)

## Trie
* A Trie`/ˈtraɪ/` is a special data structure used **to store strings that can be visualized like a graph**. It consists of nodes and edges. Each node consists of at max 26 children and edges connect each parent node to its children. These 26 pointers are nothing but pointers for each of the 26 letters of the English alphabet A separate edge is maintained for every edge.

### Intuition
* As prefixes of strings are involved, this is usually a natural fit for a trie (a prefix tree.)

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Trie)
- [YouTube](https://www.youtube.com/watch?v=zIjfhVPRZCg&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=7&t=0s)
- [Trie Data Structure - Beau teaches JavaScript](https://youtu.be/7XmS8McW_1U)
- https://www.hackerearth.com/practice/data-structures/advanced-data-structures/trie-keyword-tree/tutorial/

## Tree
* A tree data structure can be defined recursively (locally) as a collection of nodes (starting at a root node), where each node is a data structure consisting of a value, together with a list of references to nodes (the "children"), with the constraints that no reference is duplicated, and none points to the root.
* A collection of nodes, where each node is a data structure consisting of a value, together with a list of references to nodes, with the constraints that:
  * No reference is duplicated, 
  * and none points to the root
* There are many kinds of trees:
  * Binary Search Tree
  * AVL Tree
  * Red-Black Tree
  * Segment Tree - with min/max/sum range queries examples
  * Fenwick Tree (Binary Indexed Tree)

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Tree_(data_structure))
- [YouTube](https://www.youtube.com/watch?v=oSWTXtMglKE&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=8)

## Binary Search Tree
* Binary Search Trees keep their keys in sorted order, so that lookup and other operations can use the principle of binary search.
* For any node in Binary Search Tree:
  (B)<-(A)->(C), where B < A < C
```
       8   <-- Root of Binary Search Tree
  3        10                
1   6         14              
  4   7    13          
```
### Time Complexity

| Access    | Search    | Insertion | Deletion  |
| :-------: | :-------: | :-------: | :-------: |
| O(log(n)) | O(log(n)) | O(log(n)) | O(log(n)) |

### Space Complexity

O(n)

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Binary_search_tree)
- [Inserting to BST on YouTube](https://www.youtube.com/watch?v=wcIRPqTR3Kc&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8&index=9&t=0s)
- [BST Interactive Visualisations](https://www.cs.usfca.edu/~galles/visualization/BST.html)
- https://www.youtube.com/watch?v=t2CEgPsws3U&t=1563s - easy explanation!

## Union Find (Disjoint Set)
* Union Find is a data structure that keeps track of elements which are
  split into one or more disjoint sets.
* Its has two primary operations: find and union.

### References
- [Wikipedia](https://en.wikipedia.org/wiki/Disjoint-set_data_structure)
- [By Abdul Bari on YouTube](https://www.youtube.com/watch?v=wU6udHRIkcc&index=14&t=0s&list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8)
- [Union Find Introduction By WilliamFiset](https://www.youtube.com/watch?v=ibjEGG7ylHk&list=PLDV1Zeh2NRsB6SWUrDFW2RmDotAfPbeHu&index=19&ab_channel=WilliamFiset)
- https://github.com/williamfiset/Algorithms/blob/master/src/main/java/com/williamfiset/algorithms/datastructures/unionfind/UnionFind.java
- https://habr.com/ru/post/104772/

