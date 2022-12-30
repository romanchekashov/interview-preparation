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

/**
 *
 * Time complexity : O(n + m * log(m) + k * log(m)), where (n >= m), 'n' - nums.length, 'm' - number of unique numbers in nums
 * Space complexity : O(2n + k), where 'n' is Map.size and 'k' is result for top K Frequent Elements
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent2 = function(nums, k) {
    // save frequency of each number appearing in array to map(TC: O(n), SC: O(map.size() < n))
    const map = new Map();

    for(const n of nums){
        map.set(n, (map.get(n) ?? 0) + 1);
    }

    // save numbers from map using frequency of each number as a priority to store in PriorityQueue
    // (based on MIN/MAX BinaryTree called as BinaryHeap(parent node value should be less or equal to child node value))
    // (TC: O(n * log(n)), SC: O(n)), where n is map.size()
    const maxHeap = new PriorityQueue((a, b) => ((b ? b.value : 0) - (a ? a.value : 0)));

    for(const [key, value] of map){
        maxHeap.add({key, value});
    }

    // save result array by removing k elements from PriorityQueue
    // (TC: O(k * log(n)), SC: O(k))
    const res = [];

    while(res.length < k) {
        res.push(maxHeap.remove().key);
    }

    return res;
};

/**
 *
 * Time complexity : O(n + m + k), where (n >= m), 'n' - nums.length, 'm' - number of unique numbers in nums
 * Space complexity : O(2n + k), where 'n' is Map.size and 'k' is result for top K Frequent Elements
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent3 = function(nums, k) {
    // save frequency of each number appearing in array to map(TC: O(n), SC: O(map.size() < n))
    const frequencyMap = new Map();

    for(const n of nums){
        frequencyMap.set(n, (frequencyMap.get(n) ?? 0) + 1);
    }

    // (TC: O(n), SC: O(n)), where n is frequencyMap.size()
    const bucket = new Array(nums.length + 1);

    for(const [key, frequency] of frequencyMap){
        if (bucket[frequency] === undefined) {
            bucket[frequency] = [];
        }
        bucket[frequency].push(key);
    }

    // (TC: O(k), SC: O(k))
    const res = [];

    for (let pos = bucket.length - 1; pos >= 0 && res.length < k; pos--) {
        if (bucket[pos]) {
            for (let i = 0; res.length < k && i < bucket[pos].length; i++) {
                res.push(bucket[pos][i]);
            }
        }
    }

    return res;
};

const solutions = [
    topKFrequent,
    topKFrequent2,
    topKFrequent3
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([1,2].sort(), solution([1,1,1,2,2,3], 2).sort());
        assert([1].sort(), solution([1], 1).sort());
        assert([-3,-4,0,1,4,9].sort(), solution([6,0,1,4,9,7,-3,1,-4,-8,4,-7,-3,3,2,-3,9,5,-4,0], 6).sort());
    });
});
