const { assert, measurePerformance } = require('./../Utils');

function array_from(set) {
    const arr = Array.from(set);
    return arr;
}

function spread_operator(set) {
    const arr = [...set];
    return arr;
}

const solutions = [
    array_from,
    spread_operator,
];

// [...solutions, ...solutions.reverse()]
solutions.forEach((solution) => {
    const set = new Set(Array.from(Array(1000000).keys()));
    
    console.log(`\nRun tests for: [${solution.name}]`);
    measurePerformance(() => {
        var nums = solution(set);
        console.log(nums.length);
    });
});
