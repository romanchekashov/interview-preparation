"use strict";
const { inputData, outputData, readline, print } = require('../lib/io');

// test input/output data
inputData(`
2
1 2
3 5
`)

outputData(`
3
8

`)

// execute script: node ./solution.js
// solution to copy and send below (for JS IMPORTANT to add at start of script: "use strict";)
"use strict";

var solution = function (a, b) {
    return a + b
};

(function() {
    const t = readline(); // first line of input usually gives the no. of test cases,i.e, the no. of lines ahead.

    for(let i = 0; i < t; i++) {
        const input_line_args = readline().split(' '); // string length
        print(solution(+input_line_args[0], +input_line_args[1]))
    }
})()
