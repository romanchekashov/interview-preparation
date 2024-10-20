const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://youtu.be/gBC_Fd8EE8A
 * Finding a Path Through a Maze
 *
 * Testcase 1:
 * Input: maze = [
 *             [1, 3],  [0, 2],    [1],
 *             [0,4,6], [3, 5, 7], [4],
 *             [3],     [4, 8],    [7]
 *         ], start = 0, finish = 8
 * Output: [0, 3, 4, 7, 8]
 *
 * Time complexity : O(n * m)
 * Space complexity : O(n + m)
 *
 * @param {number[][]} maze
 * @param {number} start
 * @param {number} finish
 * @return {number[]}
 */
var solveMaze = function(maze, start, finish) {

    let currentPoint = start;
    const visited = new Set([currentPoint]);
    const path = [start];

    while (path[path.length - 1] !== finish && path.length > 0) {
        let foundOutlet = false;
        let idx;

        for (idx of maze[currentPoint]) {
            // check if connection leads to unvisited point
            foundOutlet = !visited.has(idx);
            if (foundOutlet) {
                break;
            }
        }

        if (foundOutlet) {
            path.push(idx);
            visited.add(idx);
        } else {
            path.pop(); // remove last
        }

        currentPoint = path[path.length - 1];
    }

    return path;
};

const solutions = [
    solveMaze
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([0, 3, 4, 7, 8], solution([
            [1, 3], [0, 2], [1],
            [0,4,6], [3, 5, 7], [4],
            [3], [4, 8], [7]
        ], 0, 8));
    });
});
