# Patterns to Ace Any Coding Interview Question

- https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed
- https://dsarevision.com/
- https://tproger.ru/translations/14-templates-to-answer-interview-questions/
- https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-100-LeetCode-Questions-to-Save-Your-Time-OaM1orEU
- https://www.educative.io/courses/grokking-the-coding-interview
- https://seanprashad.com/leetcode-patterns/
- https://github.com/SeanPrashad/leetcode-patterns
- https://leetcode.com/problem-list/top-interview-questions/?sorting=W3sic29ydE9yZGVyIjoiQVNDRU5ESU5HIiwib3JkZXJCeSI6IkRJRkZJQ1VMVFkifV0%3D

## Problems pattern frequency
| Pattern         | Frequency | Difficulty |
|-----------------|-----------|------------|
| DFS      | 30        | Hard       |
| Dynamic Programming | 21        | Hard       |
| BFS      | 17        | Medium     |
| Heap      | 17        | Medium     |
| Backtracking      | 16        | Medium     |
| Binary Search      | 14        | Medium     |
| Arrays      | 13        | Medium     |
| Two Pointers      | 11        | Medium     |
| Fast & Slow Pointers      | 10        | Easy       |
| Trie      | 10        | Easy     |
| Sliding Window      | 10        | Easy     |
| Graph      | 9         | Easy     |
| Greedy      | 8         | Easy     |
| In-place reversal of a linked list      | 6         | Easy     |
| Intervals      | 6         | Easy     |
| Topological Sort      | 6         | Easy     |
| Bit Manipulation      | 3         | Easy     |
| Union Find      | 3         | Easy     |
| Design      | 2         | Easy     |
| Sorting      | 1         | Easy     |
| QuickSelect      | 1         | Easy     |
| Bucket Sort      | 1         | Easy     |

## Tips
If input array is sorted then
- Binary search
- Two pointers

If asked for all permutations/subsets then
- Backtracking

If given a tree then
- DFS
- BFS

If given a graph then
- DFS
- BFS

If given a linked list then
- Two pointers

If recursion is banned then
- Stack

If must solve in-place then
- Swap corresponding values
- Store one or more different values in the same pointer

If asked for maximum/minimum subarray/subset/options then
- Dynamic programming

If asked for top/least K items then
- Heap
- QuickSelect

If asked for common strings then
- Map
- Trie

Else
- Map/Set for O(1) time & O(n) space
- Sort input for O(n*logn) time and O(1) space

# Sliding Window

The Sliding Window pattern is used to perform a required operation on a specific window size of a given array or linked list, such as finding the longest subarray containing all 1s. 
Sliding Windows start from the 1st element and keep shifting right by one element and adjust the length of the window according to the problem that you are solving. 
In some cases, the window size remains constant and in other cases the sizes grows or shrinks.

![Sliding Window](https://media.tproger.ru/uploads/2019/07/image8.jpg)

Following are some ways you can identify that the given problem might require a sliding window:
- The problem input is a linear data structure such as a linked list, array, or string
- You’re asked to find the longest/shortest substring, subarray, or a desired value
Common problems you use the sliding window pattern with:
- Maximum sum subarray of size ‘K’ (easy)
- Longest substring with ‘K’ distinct characters (medium)
- String anagrams (hard)

Examples in **/slidingwindow** directory:
- **MaxSumForConsecutiveK.js**

# Two Pointers or Iterators

Two Pointers is a pattern where two pointers iterate through the data structure in tandem until one or both of the pointers hit a certain condition.Two Pointers is often useful when searching pairs in a sorted array or linked list; for example, when you have to compare each element of an array to its other elements.

Two pointers are needed because with just pointer, you would have to continually loop back through the array to find the answer. This back and forth with a single iterator is inefficient for time and space complexity — a concept referred to as asymptotic analysis. While the brute force or naive solution with 1 pointer would work, it will produce something along the lines of O(n²). In many cases, two pointers can help you find a solution with better space or runtime complexity.

![Two Pointers](https://media.tproger.ru/uploads/2019/07/image5.jpg)

Ways to identify when to use the Two Pointer method:
- It will feature problems where you deal with sorted arrays (or Linked Lists) and need to find a set of elements that fulfill certain constraints
- The set of elements in the array is a pair, a triplet, or even a subarray

Here are some problems that feature the Two Pointer pattern:
- Squaring a sorted array (easy)
- Triplets that sum to zero (medium)
- Comparing strings that contain backspaces (medium)

# Fast and Slow pointers

The Fast and Slow pointer approach, also known as the Hare & Tortoise algorithm, is a pointer algorithm that uses two pointers which move through the array (or sequence/linked list) at different speeds. This approach is quite useful when dealing with cyclic linked lists or arrays.

By moving at different speeds (say, in a cyclic linked list), the algorithm proves that the two pointers are bound to meet. The fast pointer should catch the slow pointer once both the pointers are in a cyclic loop.

![Fast and Slow pointers](https://media.tproger.ru/uploads/2019/07/image7.jpg)

How do you identify when to use the Fast and Slow pattern?
- The problem will deal with a loop in a linked list or array
- When you need to know the position of a certain element or the overall length of the linked list.

When should I use it over the Two Pointer method mentioned above?
- There are some cases where you shouldn’t use the Two Pointer approach such as in a singly linked list where you can’t move in a backwards direction. An example of when to use the Fast and Slow pattern is when you’re trying to determine if a linked list is a palindrome.

Problems featuring the fast and slow pointers pattern:
- Linked List Cycle (easy)
- Palindrome Linked List (medium)
- Cycle in a Circular Array (hard)

Examples in **/slidingwindow** directory:
- **RemoveDuplicatesFromSortedArray.js**

# Merge Intervals

The Merge Intervals pattern is an efficient technique to deal with overlapping intervals. In a lot of problems involving intervals, you either need to find overlapping intervals or merge intervals if they overlap. The pattern works like this:

Given two intervals (‘a’ and ‘b’), there will be six different ways the two intervals can relate to each other:
- 'a' and 'b' don't overlap
- 'a' and 'b' overlaps, 'b' ends after 'a'
- 'a' overlap the whole 'b'
- 'a' and 'b' overlaps, 'a' ends after 'b'
- 'b' overlap the whole 'a'
- 'b' and 'a' don't overlap

![Merge Intervals](https://media.tproger.ru/uploads/2019/07/image12.jpg)
Understanding and recognizing these six cases will help you help you solve a wide range of problems from inserting intervals to optimizing interval merges.

How do you identify when to use the Merge Intervals pattern?
- If you’re asked to produce a list with only mutually exclusive intervals
- If you hear the term “overlapping intervals”.
  
Merge interval problem patterns:
- Intervals Intersection (medium)
- Maximum CPU Load (hard)

Example:
- **medium/MergeIntervals_leetcode56medium.js**
