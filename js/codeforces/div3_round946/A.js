const { CodeforcesTester } = require('../../lib/codeforces-tester');

// test input/output data
const tester = new CodeforcesTester().inputData(`
11
1 1
7 2
12 4
0 3
1 0
8 1
0 0
2 0
15 0
8 2
0 9

`).outputData(`
1
1
2
2
1
1
0
1
1
2
5

`);

// execute script: node ./solution.js
// solution to copy and send below (for JS IMPORTANT to add at start of script: "use strict";)
('use strict');

class CodeforcesIO {
    /**
     * @param solve a callback function which provides functionality to work with input/output data
     * ```js
     * new CodeforcesIO((readline, print) => {
     *  const echo = readline()
     *  print(echo)
     * })
     * ```
     */
    constructor(solve) {
        this.lines = [];
        this.lineNum = 0;
        this.result = [];

        if (typeof tester !== 'undefined') {
            // test input/output data are set
            solve(tester.readline.bind(tester), tester.print.bind(tester));
            return;
        }

        if (typeof process !== 'undefined') {
            // for Node.js 12.16.3
            require('readline')
                .createInterface({
                    input: process.stdin,
                })
                .on('line', (line) => {
                    this.lines.push(line);
                })
                .on('close', () => {
                    solve(this.readline.bind(this), this.print.bind(this));
                    process.stdout.write(this.result.join('\n'));
                });
            return;
        }

        solve(readline, print); // readline, print are defined globally in JavaScript V8 4.8.0
    }

    readline() {
        return this.lines[this.lineNum++];
    }

    print(res) {
        this.result.push(res);
    }
}

const solution = (cell1, cell4) => {
    const CELLS_PER_SCREEN = 15;
    const CELL4_PER_SCREEN = 2;
    let screens = Math.ceil(cell4 / CELL4_PER_SCREEN);
    let cellsLeft = CELLS_PER_SCREEN * screens - cell4 * 4;
    cell1 -= cellsLeft;

    if (cell1 > 0) {
        screens += Math.ceil(cell1 / CELLS_PER_SCREEN);
    }

    return screens;
};

new CodeforcesIO((readline, print) => {
    const t = readline();

    for (let i = 0; i < t; i++) {
        const lineArgs = readline().split(' '); // destruction
        print(solution(+lineArgs[0], +lineArgs[1]));
    }
});
