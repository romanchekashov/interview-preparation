const { CodeforcesTester } = require('../lib/codeforces-tester');

// test input/output data
const tester = new CodeforcesTester().inputData(`
7
1 10
1 5
2 80
0 10
200 100
3 100
70 100
100 200
150 150
5 8
3 1
5 3
3 4
1 5
5 3
2 5
1 5
2 1
5 3
2 5
2 4
4 1
5 1
3 4
5 2
2 1
1 2
3 5
3 2
3 2

`).outputData(`
0
10
200
15
1
9
9

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

const solution = (months, salary, costOfHappy) => {
    // console.log('months', months, 'salary', salary, 'costOfHappy', costOfHappy);

    const maxHappyBuyOnce = (wallet, initHappy, startIdx) => {
        let maxHappy = initHappy;
        let maxHappyIdx = startIdx;
        let maxHappyWallet = wallet;
        // console.log('maxHappyBuyOnce', wallet, initHappy, startIdx);

        for (let i = startIdx; i < months; i++) {
            const [cost, happy] = costOfHappy[i];
            if (wallet >= cost) {
                maxHappy = Math.max(maxHappy, happy);
                if (maxHappy === happy) {
                    maxHappyIdx = i;
                    maxHappyWallet = wallet - cost;
                    break;
                }
            }
            wallet += salary;
        }
        return { maxHappy, maxHappyIdx, maxHappyWallet };
    };

    let wallet = 0;
    let maxHappy = 0;
    let startIdx = 0;
    let res = null;

    do {
        res = maxHappyBuyOnce(wallet, 0, startIdx);
        wallet = res.maxHappyWallet + salary;
        maxHappy += res.maxHappy;
        startIdx = res.maxHappyIdx + 1;
        // console.log('res', res);
    } while (startIdx < months);

    return maxHappy;
};

new CodeforcesIO((readline, print) => {
    const t = readline();

    for (let i = 0; i < t; i++) {
        const [months, salary] = readline().split(' ').map(Number);
        const costOfHappy = [];

        for (let j = 0; j < months; j++) {
            const lineArgs = readline().split(' '); // destruction
            costOfHappy.push(lineArgs.map(Number));
        }
        try {
            print(solution(months, salary, costOfHappy));
        } catch (e) {
            console.error(e);
        }
    }
});
