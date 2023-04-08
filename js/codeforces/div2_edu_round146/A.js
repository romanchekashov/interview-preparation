const { CodeforcesTester } = require('../../lib/codeforces-tester');

// test input/output data
const tester = new CodeforcesTester()
    .inputData(`
5
5 3
6 1
7 4
8 8
7 3

`).outputData(`
YES
YES
NO
YES
YES

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

/**
 * We have:
 * 2 * x + k * y = n, where x, y, k, n - integer non-negative numbers
 * Intuition from reverse-engineering of Um_nik solution:
 * We can divide left and right sides to 2:
 * x + (k / 2) * y = n / 2
 * So we should know to lemmas from school:
 * 1. Sum of two integers always equals to integer
 * 2. Sum of integer and non-integer always equals to non-integer
 * According to that and knowing that x, y is integers we should check two variants:
 * 1. if n / 2 is integer and x is integer, then it means (k / 2) * y is also integer
 * n / 2 is integer if (n % 2 === 0)
 * 2. if n / 2 is non-integer and x is integer, then it means (k / 2) * y is non-integer
 * (k / 2) * y is non-integer only if (k / 2) is non-integer
 * (k / 2) is non-integer if (k % 2 === 1)
 *
 * @param {string} str_n
 * @param {string} str_k
 * @return {'YES' | 'NO'}
 */
const solution = (str_n, str_k) => {
    // 2*x + k * y = n
    const n = BigInt(str_n)
    if (n % 2n === 0n) return 'YES'
    const k = BigInt(str_k)
    if (k % 2n === 1n) return 'YES'
    return 'NO'
}

new CodeforcesIO((readline, print) => {
    const t = readline()

    for (let i = 0; i < t; i++) {
        const [n, k] = readline().split(' ');
        print(solution(n, k));
    }
})
