const { assert, measurePerformance } = require('./../../Utils');

/**
 * https://www.lintcode.com/problem/920/
 *
 * Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), determine if a person could attend all meetings.
 */

/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
// O(n*logn) time | O(1) space
var canAttendMeetings = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i - 1][1] > intervals[i][0]) return false;
    }
    return true;
};

const solutions = [
    canAttendMeetings
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(false, solution([[0,30],[5,10],[15,20]]));
        assert(true, solution([[5,8],[9,15]]));
    });
});
