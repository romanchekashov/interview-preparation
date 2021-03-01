const { assert, measurePerformance } = require('./../../Utils');

function findDuplicates(input1) {
    const map = {};

    for (let i = 0; i < input1.length; i++) {
        const key = input1[i];
        if (map[key] === undefined) map[key] = 0;
        map[key]++;
    }

    return Object.entries(map)
        .filter(([k, v]) => v > 1)
        .map(([k, v]) => parseInt(k));
}

const solutions = [findDuplicates];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([1, 2, 4], solution([1, 2, 2, 2, 3, 1, 4, 5, 4, 1]));
        assert([2, 4, 5], solution([2, 2, 3, 1, 4, 5, 4, 5]));
    });
});
