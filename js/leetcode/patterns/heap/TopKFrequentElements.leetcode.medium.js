const { assert, measurePerformance } = require('./../../../Utils');
const { PriorityQueue } = require('../../../datastructures/Heap/PriorityQueue');

/**
 * https://leetcode.com/problems/top-k-frequent-elements/
 * 347. Top K Frequent Elements
 *
 * Given an integer array 'nums' and an integer 'k', return the 'k' most frequent elements.
 * You may return the answer in any order.
 *
 * Testcase 1:
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 *
 * Testcase 2:
 * Input: nums = [1], k = 1
 * Output: [1]
 */

// maxHeap.push(key);
//
// if (maxHeap.length > 1) {
//     let idx = 1;
//     while (idx < maxHeap.length && map[maxHeap[idx - 1]] < map[maxHeap[idx]]) {
//         [maxHeap[idx - 1], maxHeap[idx]] = [maxHeap[idx], maxHeap[idx - 1]];
//         idx++;
//     }
// }

/**
 *
 * Time complexity : O(n + m), where (n >= m), 'n' - nums.length, 'm' - number of unique numbers in nums
 * Space complexity : O(m + k), where 'm' is Map.size and 'k' is result for top K Frequent Elements
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
   const map = {};

   for (const num of nums) {
       if (map[num] === undefined) {
           map[num] = 0;
       }

       map[num]++;
   }

   const isLess = (key1, key2) => (map[key1] ?? Number.NEGATIVE_INFINITY) < (map[key2] ?? Number.NEGATIVE_INFINITY);

    return Object.keys(map).reduce((maxHeap, key) => {
        if (isLess(maxHeap[k - 1], +key)) {
            maxHeap[k - 1] = +key;

            let idx = k - 1;
            while (idx > 0 && isLess(maxHeap[idx - 1], maxHeap[idx])) {
                [maxHeap[idx - 1], maxHeap[idx]] = [maxHeap[idx], maxHeap[idx - 1]];
                idx--;
            }
        }

        return maxHeap;
   }, new Array(k).fill(Number.NEGATIVE_INFINITY));
};

var topKFrequent2 = function(nums, k) {
    const map = new Map();

    for(const n of nums){
        map.set(n, (map.get(n) ?? 0) + 1);
    }

    const maxHeap = new PriorityQueue((a, b) => ((b ? b.value : 0) - (a ? a.value : 0)));

    for(const [key, value] of map){
        maxHeap.add({key, value});
    }

    const res = [];

    while(res.length < k) {
        res.push(maxHeap.remove().key);
    }

    return res;
};

const solutions = [
    topKFrequent,
    topKFrequent2
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([1,2], solution([1,1,1,2,2,3], 2));
        assert([1], solution([1], 1));
        assert([-3,-4,0,1,4,9], solution([6,0,1,4,9,7,-3,1,-4,-8,4,-7,-3,3,2,-3,9,5,-4,0], 6));
    });
});
