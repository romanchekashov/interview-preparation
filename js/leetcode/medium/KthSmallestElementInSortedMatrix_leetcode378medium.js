const { assert, measurePerformance } = require('./../../Utils');
const { MaxHeap } = require('./../../datastructures/Heap/Heap');

/**
 * 378. Kth Smallest Element in a Sorted Matrix
 * https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/
 *
 *
 * let parentIndex = i; // i starts from 0
 * let leftIndex = 2 * i + 1;
 * let rightIndex = 2 * i + 2;
 *
 * parentIndex = Math.floor((left or right)Index / 2)
 *
 * Note that MaxPriorityQueue is already included in Leetcode's js environment:
 * https://support.leetcode.com/hc/en-us/articles/360011833974-What-are-the-environments-for-the-programming-languages-
 *
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(matrix, k) {
    // const heap = new MaxPriorityQueue();
    const heap = new MaxHeap();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            heap.enqueue(matrix[i][j]);

            if (heap.size() > k) {
                heap.dequeue();
            }
        }
    }

    return heap.dequeue();
};

// https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/solutions/1883726/javascript-max-heap-solution/?orderBy=most_votes&languageTags=javascript
// var kthSmallest = function(matrix, k) {
//     const q = new MaxPriorityQueue();
//
//     for(let i = 0; i < matrix.length; i++)
//         for(let j = 0; j < matrix.length; j++){
//             q.enqueue(matrix[i][j]);
//             if(q.size() > k) q.dequeue();
//         }
//
//     return q.front().element;
// };

var kthSmallestBinarySearch = function(matrix, k) {
    const countLessOrEqual = (ans) => {
        let count = 0;

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                if (matrix[i][j] <= ans) {
                    count++;
                }
            }
        }

        return count;
    }

    const n = matrix.length;
    let startValue = matrix[0][0];
    let endValue = matrix[n - 1][n - 1];
    let mid, count;

    while (startValue < endValue) {
        mid = startValue + Math.floor((endValue - startValue) / 2);
        count = countLessOrEqual(mid);
        // console.log(startValue, endValue, mid, count)
        if (count < k) {
            startValue = mid + 1;
        } else {
            endValue = mid;
        }
    }

    return startValue;
};

var kthSmallest3 = function(matrix, k) {
    var countLEQ = function (matrix, x) {
        var n = matrix.length;
        var count = 0;
        var j;

        matrix.forEach(function(row){
            for(j = 0; j < n && row[j] <= x; j++){}
            count += j
        });
        return count;
    };

    var n = matrix.length, lo = matrix[0][0]
    var hi = matrix[n-1][n-1];
    var mid, count;

    while(lo < hi) {
        mid = (lo + (hi - lo) / 2) >> 0;
        count = countLEQ(matrix, mid);
        // console.log(lo, hi, mid, count)
        if (count < k) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
};

const solutions = [
    kthSmallest,
    kthSmallestBinarySearch,
    kthSmallest3
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(13, solution([[1,5,9],[10,11,13],[12,13,15]], 8));
        assert(-5, solution([[-5]], 1));
        assert(1, solution([[1,2],[1,3]], 2));
        assert(2, solution([[1,2],[1,3]], 3));
    });
});
