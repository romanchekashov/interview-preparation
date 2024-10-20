const { CodeforcesTester } = require('../lib/codeforces-tester');

// test input/output data
const tester = new CodeforcesTester()
    .inputData(`
11
5 4
76543
1 0
1
2 5
44
3 6
666
5 6
13579
5 8
97531
19 4
9876543210123456789
5 7
73737
8 1
20000000
7 0
7058959
12 1
828127127732

`)
.outputData(`
765443
10
544
6666
613579
987531
98765443210123456789
773737
210000000
70589590
8281271277321

`)

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

const solution = (n, d, sNum) => {
    let i = 0

    while (i < n) {
        if (d > +sNum[i]) break
        i++
    }

    if (i === 0) return d + sNum

    return sNum.substring(0, i) + d + sNum.substring(i)
};

new CodeforcesIO((readline, print) => {
    const t = readline()

    for (let i = 0; i < t; i++) {
        const lineArgs = readline().split(' '); // destruction
        print(solution(+lineArgs[0], +lineArgs[1], readline()))
    }
})
