const { run } = require('../consoleRunner');
const { assert, measurePerformance } = require('../../../Utils');

/**
 * Дано целое число 1 <= n <= 40, необходимо вычислить n-е число Фибоначчи
 * (напомним, что F(0) = 0, F(1) = 1, F(n) = F(n - 1) + F(n - 2) при n >= 2).
 * @param args
 * @return {number}
 */
const solution = (args) => {
    const n = parseInt(args);

    if (n === 1) {
        return 1;
    }

    let i = 1;
    let a1 = 0;
    let a2 = 1;
    let temp;

    while (i++ < n) {
        temp = a1 + a2;
        a1 = a2;
        a2 = temp;
    }

    return a2;
}

run(solution);

// measurePerformance(() => {
//     assert(2, solution(3));
//     assert(6765, solution(20));
// });
