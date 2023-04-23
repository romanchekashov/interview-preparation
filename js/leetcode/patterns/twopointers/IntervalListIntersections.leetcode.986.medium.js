const { assert, measurePerformance } = require('./../../../Utils');

/**
 * https://leetcode.com/problems/interval-list-intersections/
 *
 * 986. Interval List Intersections
 *
 * You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order.
 *
 * Return the intersection of these two interval lists.
 *
 * A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.
 *
 * The intersection of two closed intervals is a set of real numbers that are either empty or represented as a closed interval. For example, the intersection of [1, 3] and [2, 4] is [2, 3].
 *
 * Constraints:
 * 0 <= firstList.length, secondList.length <= 1000
 * firstList.length + secondList.length >= 1
 * 0 <= starti < endi <= 109
 * endi < starti+1
 * 0 <= startj < endj <= 109
 * endj < startj+1
 *
 * Complexity:
 * Time: O(n + m), where n - firstList.length, m - secondList.length
 * Space: O(1), because result array doesn't count(maybe printout to output directly)
 *
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function(firstList, secondList) {
    const result = [];
    let firstIdx = secondIdx = 0;

    while (firstIdx < firstList.length && secondIdx < secondList.length) {
        const firstSubList = firstList[firstIdx];
        const secondSubList = secondList[secondIdx];
        const leftOffset = Math.max(firstSubList[0], secondSubList[0]);
        const rightOffset = Math.min(firstSubList[1], secondSubList[1]);

        if (leftOffset <= rightOffset) { //intersect
            result.push([leftOffset, rightOffset]);
        }

        if (firstSubList[1] > secondSubList[1]) {
            secondIdx++;
        } else {
            firstIdx++;
        }
    }

    return result;
};

const solutions = [
    intervalIntersection
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]], solution([[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]]));
        assert([], solution([[1,3],[5,9]], []));
        assert([[19,20]], solution([[17,20]], [[2,3],[6,8],[12,14],[19,20]]));
    });
});
