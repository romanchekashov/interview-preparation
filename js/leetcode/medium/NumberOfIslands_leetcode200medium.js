const { assert, measurePerformance } = require('./../../Utils');

/**
 * 200. Number of Islands
 * https://leetcode.com/problems/number-of-islands/
 *
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    const hashCode = (x, y) => x * 1000 + y;
    const sets = [];
    const inSet = (hash) => {
        for (const set of sets) {
            if (set.has(hash)) {
                return set;
            }
        }
    }

    for (let i = 0, m = grid.length; i < m; i++) {
        for (let j = 0, n = grid[i].length; j < n; j++) {
            if (grid[i][j] === '1') {
                const hash = hashCode(i, j);
                let inset = inSet(hash);

                if (inset) {
                    continue;
                }

                if (i - 1 >= 0) {
                    const hashLeft = hashCode(i - 1, j);
                    inset = inSet(hashLeft);

                    if (inset) {
                        inset.add(hash);
                        continue;
                    }
                }

                if (i + 1 < m) {
                    const hashLeft = hashCode(i + 1, j);
                    inset = inSet(hashLeft);

                    if (inset) {
                        inset.add(hash);
                        continue;
                    }
                }

                if (j - 1 >= 0) {
                    const hashTop = hashCode(i, j - 1);
                    inset = inSet(hashTop);

                    if (inset) {
                        inset.add(hash);
                        continue;
                    }
                }

                if (j + 1 < n) {
                    const hashTop = hashCode(i, j + 1);
                    inset = inSet(hashTop);

                    if (inset) {
                        inset.add(hash);
                        continue;
                    }
                }

                sets.push(new Set([hash]));
            }
        }
    }

    console.log(sets)

    return sets.length;
};

var numIslands2 = function(grid) {
    let islands = 0;

    for (let i = 0, m = grid.length; i < m; i++) {
        for (let j = 0, n = grid[i].length; j < n; j++) {
            if (grid[i][j] === '1') {
                islands++;

                const queue = [[i, j]];

                while (queue.length > 0) {
                    const node = queue.shift();

                    if (node[0] - 1 >= 0 && grid[node[0] - 1][node[1]] === '1') {
                        grid[node[0] - 1][node[1]] = '0';
                        queue.push([node[0] - 1, node[1]]);
                    }

                    if (node[0] + 1 < m && grid[node[0] + 1][node[1]] === '1') {
                        grid[node[0] + 1][node[1]] = '0';
                        queue.push([node[0] + 1, node[1]]);
                    }

                    if (node[1] - 1 >= 0 && grid[node[0]][node[1] - 1] === '1') {
                        grid[node[0]][node[1] - 1] = '0';
                        queue.push([node[0], node[1] - 1]);
                    }

                    if (node[1] + 1 < n && grid[node[0]][node[1] + 1] === '1') {
                        grid[node[0]][node[1] + 1] = '0';
                        queue.push([node[0], node[1] + 1]);
                    }
                }
            }
        }
    }

    return islands;
};

var numIslands3 = function(grid) {
    let islands = 0;
    const offsets = [0, 1, 0, -1, 0];

    for (let i = 0, m = grid.length; i < m; i++) {
        for (let j = 0, n = grid[i].length; j < n; j++) {
            if (grid[i][j] === '1') {
                islands++;

                const queue = [[i, j]];

                while (queue.length > 0) {
                    const node = queue.shift();

                    for (let k = 0; k < 4; k++) {
                        let r = node[0] + offsets[k], c = node[1] + offsets[k + 1];

                        if (r >= 0 && r < m && c >= 0 && c < n && grid[r][c] === '1') {
                            grid[r][c] = '0';
                            queue.push([r, c]);
                        }
                    }
                }
            }
        }
    }

    return islands;
};

const solutions = [
    // numIslands,
    numIslands2,
    numIslands3
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(1, solution([
            ["1","1","1","1","0"],
            ["1","1","0","1","0"],
            ["1","1","0","0","0"],
            ["0","0","0","0","0"]
        ]));
    });
    measurePerformance(() => {
        assert(3, solution([
            ["1","1","0","0","0"],
            ["1","1","0","0","0"],
            ["0","0","1","0","0"],
            ["0","0","0","1","1"]
        ]));
    });
    measurePerformance(() => {
        assert(1, solution([
            ["1","1","1"],
            ["0","1","0"],
            ["1","1","1"]
        ]));
    });
    measurePerformance(() => {
        assert(1, solution([
            ["1","1","1","1","1","0","1","1","1","1","1","1","1","1","1","0","1","0","1","1"],
            ["0","1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","1","0"],
            ["1","0","1","1","1","0","0","1","1","0","1","1","1","1","1","1","1","1","1","1"],
            ["1","1","1","1","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
            ["1","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
            ["1","0","1","1","1","1","1","1","0","1","1","1","0","1","1","1","0","1","1","1"],
            ["0","1","1","1","1","1","1","1","1","1","1","1","0","1","1","0","1","1","1","1"],
            ["1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","0","1","1"],
            ["1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","1","1","1","1","1"],
            ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
            ["0","1","1","1","1","1","1","1","0","1","1","1","1","1","1","1","1","1","1","1"],
            ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
            ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
            ["1","1","1","1","1","0","1","1","1","1","1","1","1","0","1","1","1","1","1","1"],
            ["1","0","1","1","1","1","1","0","1","1","1","0","1","1","1","1","0","1","1","1"],
            ["1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","1","1","0"],
            ["1","1","1","1","1","1","1","1","1","1","1","1","1","0","1","1","1","1","0","0"],
            ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
            ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"],
            ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"]
        ]));
    });
});
