// const { CodeforcesTester } = require('../lib/codeforces-tester');
//
// // test input/output data
// const tester = new CodeforcesTester()
//     .inputData(`
// 3
// `)
// .outputData(`
// 3 10 5 16 8 4 2 1
// `)

// execute script: node ./solution.js
// solution to copy and send below (for JS IMPORTANT to add at start of script: "use strict";)
"use strict";

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
        this.lines = []
        this.lineNum = 0
        this.result = []

        if (typeof tester !== 'undefined') { // test input/output data are set
            solve(tester.readline.bind(tester), tester.print.bind(tester));
            return
        }

        if (typeof process !== 'undefined') { // for Node.js 12.16.3
            require('readline').createInterface({
                input: process.stdin
            }).on('line', (line) => {
                this.lines.push(line);
            }).on('close', () => {
                solve(this.readline.bind(this), this.print.bind(this));
                process.stdout.write(this.result.join('\n'));
            })
            return;
        }

        solve(readline, print); // readline, print are defined globally in JavaScript V8 4.8.0
    }

    readline() {
        return this.lines[this.lineNum++]
    }

    print(res) {
        this.result.push(res);
    }
}

const solution = (n) => {
    let res = '' + n;

    while (n > 1) {
        if (n % 2 === 0) {
            n /= 2;
        } else {
            n = 3 * n + 1;
        }
        res += ' ' + n;
    }
    return res;
};

new CodeforcesIO((readline, print) => {
    print(solution(+readline()))
})
