const { CodeforcesTester } = require('./lib/codeforces-tester');

// test input/output data
const tester = new CodeforcesTester()
    .inputData(`
2
1 2
3 5
`).outputData(`
3
8

`)

// execute script: node Template.js
// This template can run code in both envs: JavaScript V8 4.8.0, Node.js 12.16.3
// NOTE: Always use Node.js 12.16.3 because it supports ES6 features and BigInt which sometimes really important
// copy and send code with solution to https://codeforces.com/ from HERE below (for engine JavaScript V8 4.8.0 IMPORTANT to add at start of script: "use strict";)
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

// your solution starts here. Good luck!
const solution = (a, b) => {
    return a + b
}

new CodeforcesIO((readline, print) => {
    const t = readline() // first line of input usually gives the no. of test cases,i.e, the no. of lines ahead.

    for (let i = 0; i < t; i++) {
        const lineArgs = readline().split(' ')
        print(solution(+lineArgs[0], +lineArgs[1]))
    }
})
