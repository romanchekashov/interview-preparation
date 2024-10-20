const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://www.lintcode.com/problem/919/
 *
 * Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.
 *
 * (0,8),(8,10) is not conflict at 8
 */

/**
 * @param {number[][]} intervals an array of meeting time intervals
 * @return {number} the minimum number of conference rooms required
 */
// O(n*logn) time | O(n) space
var minMeetingRooms = function(intervals) {
    const start = intervals.map(i => i[0])
        .sort((a, b) => a - b);
    const end = intervals.map(i => i[1])
        .sort((a, b) => a - b);

    let res = 0, count = 0;
    let s = 0, e = 0;

    while (s < intervals.length) {
        if (start[s] < end[e]) {
            s++;
            count++;
        } else {
            e++;
            count--;
        }
        res = Math.max(res, count);
    }
    return res;
};

const solutions = [
    minMeetingRooms
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(2, solution([[0,30],[5,10],[15,20]]));
        assert(1, solution([[2,7]]));
    });
});
