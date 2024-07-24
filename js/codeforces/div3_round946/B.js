const { CodeforcesTester } = require('../../lib/codeforces-tester');

// test input/output data
const tester = new CodeforcesTester().inputData(`
5
10
serofedsoc
3
ttf
9
tlrhgmaoi
1
w
15
hnndledmnhlttin

`).outputData(`
codeforces
fft
algorithm
w
meetinthemiddle

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

const solution = (strLength, str) => {
    const r = [],
        set = new Set();
    for (const c of str) {
        if (!set.has(c)) {
            r.push(c);
            set.add(c);
        }
    }
    r.sort();

    // console.log(r);

    const map = new Map();
    for (let i = 0, len = Math.ceil(r.length / 2); i < len; i++) {
        map.set(r[i], r[r.length - 1 - i]);
        map.set(r[r.length - 1 - i], r[i]);
    }

    // console.log(map);

    const res = [];
    for (const c of str) {
        res.push(map.get(c));
    }

    return res.join('');
};

new CodeforcesIO((readline, print) => {
    const t = readline();

    for (let i = 0; i < t; i++) {
        const n = +readline();
        const b = readline();
        print(solution(n, b));
    }
});
