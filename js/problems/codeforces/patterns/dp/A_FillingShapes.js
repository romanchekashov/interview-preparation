const { CodeforcesTester } = require('../../lib/codeforces-tester');

// https://codeforces.com/gym/302977/problem/A
// test input/output data
const tester = new CodeforcesTester().inputData(`
3
4
1
6

`).outputData(`
4
0
8

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

// const solution = (n) => {
//     const dp = Array(n + 1).fill(0);
//     dp[0] = 1;
//     dp[1] = 0;

//     for (let i = 2; i <= n; i++) {
//         dp[i] = 2 * dp[i - 2];
//     }

//     return dp[n];
// };

const solution = (n) => {
    const dp = Array(2);
    dp[0] = 1;
    dp[1] = 0;

    for (let i = 2; i <= n; i++) {
        dp[i % 2] = 2 * dp[(i - 2) % 2];
    }

    return dp[n % 2];
};

new CodeforcesIO((readline, print) => {
    print(solution(+readline()));
});
