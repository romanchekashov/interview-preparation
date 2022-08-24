const { run } = require('../consoleRunner');
const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://stepik.org/lesson/13229/step/5?unit=3415
 *
 * Наибольший Общий Делитель (НОД)
 *
 * По данным двум числам 1 <= a, b <= 2 * 10^9 найдите их наибольший общий делитель.
 *
 * @param args
 * @return {number}
 */
const solution = (args) => {
    const arr = args.split(' ');
    const a1 = parseInt(arr[0]);
    const a2 = parseInt(arr[1]);

    const greatestCommonDivisor = (a, b) => {
        if (a === 0) {
            return b;
        }

        if (b === 0) {
            return a;
        }

        if (a > b) {
            return greatestCommonDivisor(a % b, b);
        }

        if (a < b) {
            return greatestCommonDivisor(a, b % a);
        }

        return a; // a === b
    }

    return greatestCommonDivisor(a1, a2);
};

const solution2 = (args) => {
    const arr = args.split(' ');
    let a = parseInt(arr[0]);
    let b = parseInt(arr[1]);

    while (a > 0 && b > 0) {
        if (a > b) {
            a %= b;
        } else {
            b %= a;
        }
    }

    return Math.max(a, b);
};

// run(solution);

measurePerformance(() => {
    assert(1, solution2('18 35'));
    assert(4, solution2('14159572 63967072'));
});
