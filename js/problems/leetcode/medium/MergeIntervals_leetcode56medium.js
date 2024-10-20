const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://leetcode.com/problems/merge-intervals/
 *
 * Given an array of intervals where intervals[i] = [start(i), end(i)], merge all overlapping intervals,
 * and return an array of the non-overlapping intervals that cover all the intervals in the input.
 *
 * Example 1:
 * Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
 * Output: [[1,6],[8,10],[15,18]]
 * Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
 *
 * Example 2:
 * Input: intervals = [[1,4],[4,5]]
 * Output: [[1,5]]
 * Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 */

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(initIntervals) {

    function recheck(intervals) {
        if (intervals.length === 1) {
            return intervals;
        }

        const result = [];
        let temp = [...intervals[0]];

        for (let i = 1; i < intervals.length; i++) {
            if (temp[1] >= intervals[i][0] && temp[1] <= intervals[i][1]) {
                temp = [Math.min(temp[0], intervals[i][0]), Math.max(temp[1], intervals[i][1])];
            } else {
                result.push(temp);
                temp = [...intervals[i]];
            }
        }

        result.push(temp);

        if (result.length === intervals.length) {
            return result;
        } else {
            return recheck(result);
        }
    }

    return recheck(initIntervals.sort((a, b) => a[1] - b[1]));
};

/**
 * Intuition:
 * If we sort the intervals by their start value, then each set of intervals
 * that can be merged will appear as a contiguous "run" in the sorted list.
 *
 * Algorithm:
 * First, we sort the list as described. Then, we insert the first interval into our merged list
 * and continue considering each interval in turn as follows:
 * If the current interval begins after the previous interval ends, then they do not overlap
 * and we can append the current interval to merged. Otherwise, they do overlap, and we merge them
 * by updating the end of the previous interval if it is less than the end of the current interval.
 *
 * Complexity analysis:
 * Time complexity : O(n * log(n)).
 * Space complexity : O(log(n)) or O(n).
 * If we can sort intervals in place, we do not need more than constant additional space,
 * although the sorting itself takes O(log(n)) space. Otherwise, we must allocate linear space to store a copy of intervals and sort that.
 *
 * @param intervals
 * @return {*[][]|*}
 */
var merge2 = function(intervals) {
    if (intervals.length === 1) {
        return intervals;
    }

    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [[...intervals[0]]];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] > merged[merged.length - 1][1]) {
            merged.push([...intervals[i]]);
        } else {
            if (merged[merged.length - 1][1] < intervals[i][1]) {
                merged[merged.length - 1][1] = intervals[i][1];
            }
        }
    }

    return merged;
};

const solutions = [
    merge,
    merge2
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([[1,5]], solution([[1,4],[4,5]]));
        assert([[1,6],[8,10],[15,18]], solution([[1,3],[2,6],[8,10],[15,18]]));
        assert([[0,4]], solution([[1,4],[0,4]]));
        assert([[0,4]], solution([[1,4],[0,1]]));
        assert([[1,10]], solution([[2,3],[4,5],[6,7],[8,9],[1,10]]));
    });
});
