const { assert, measurePerformance } = require('../../Utils');

/**
 * @param {number} N - целое число, количество сотрудников готовых к объединению
 * @param {number[]} staff - массив длины N с грейдами доступных сотрудников
 * @param {number} K - целое число, количество доступных клавиатур
 * @returns {number} - максимальный уровень Яндексформера
 */
const solution1 = function (N, staff, K) {
    const grades = new Array(26).fill(0);

    for (const grade of staff) grades[grade]++;

    let res = 0;
    for (let i = grades.length - 1; i >= 0 && K > 0; i--) {
        const count = grades[i];
        if (count === 0) continue;
        res += Math.min(count, K) * i;
        K -= count;
    }

    return res;
};

const solutions = [solution1];

solutions.forEach((solution) => {
    console.log(`Run tests for: [${solution.name}]`);
    measurePerformance(() => {
        assert(59, solution(8, [5, 13, 8, 4, 4, 15, 1, 9], 8));
    });
});
