"use strict";
const { inputData, outputData, readline, print } = require('../../lib/codeforces-tester');

// test input/output data
inputData(`
11
5
3 4 4 5
4
2 2 1
5
0 0 0 0
6
0 3 4 4 3
2
10
4
3 3 3
5
4 2 5 5
4
3 3 3
4
2 1 0
3
4 4
6
8 1 3 5 10

`)

outputData(`
3 0 4 0 4
2 2 1 1
0 0 0 0 0
0 0 3 4 3 3
10 10
3 3 3 1
4 2 2 5 5
3 3 3 3
2 1 0 0
2 4 4
8 1 1 3 5 10
`)

// execute script: node ./solution.js
// solution to copy and send below (for JS IMPORTANT to add at start of script: "use strict";)
"use strict";

var solution = function (n, bArr) {
    console.log(n, bArr)
    let aArr = []

    for (let i = 1; i < bArr.length; i++) {
        let x = bArr[i - 1] > 0 ? bArr[i - 1] - 1 : bArr[i - 1]
        console.log(x, bArr[i - 1], bArr[i])
        if (x < bArr[i]) {
            aArr.push(bArr[i - 1])
            aArr.push(x)
        } else if (bArr[i - 1] <= bArr[i]) {
            aArr.push(x)
            aArr.push(bArr[i - 1])
        }
    }

    if (aArr.length === 0) return [bArr[0], bArr[0]].join(' ')

    return aArr.slice(0, n).join(' ')
};

(function() {
    const t = readline(); // first line of input usually gives the no. of test cases,i.e, the no. of lines ahead.

    for(let i = 0; i < t; i++) {
        print(solution(+readline(), readline().split(' ').map(num => +num)))
    }
})()
