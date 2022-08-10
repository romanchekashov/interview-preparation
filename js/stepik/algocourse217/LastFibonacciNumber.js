const { run } = require('./consoleRunner');
const { assert, measurePerformance } = require('../../Utils');

/**
 * https://stepik.org/lesson/13228/step/7?unit=3414
 *
 * Задача на программирование: последняя цифра большого числа Фибоначчи
 *
 * Дано число 1 <= n <= 10^7, необходимо найти последнюю цифру nn-го числа Фибоначчи.
 *
 * Как мы помним, числа Фибоначчи растут очень быстро, поэтому при их вычислении нужно быть аккуратным с переполнением.
 * В данной задаче, впрочем, этой проблемы можно избежать, поскольку нас интересует только последняя цифра числа Фибоначчи:
 * если 0 <= a, b <= 9 — последние цифры чисел F(i) и F(i+1) соответственно, то (a + b) mod 10 — последняя цифра числа F(i+2)
 *
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
        temp = (a1 + a2) % 10;
        a1 = a2;
        a2 = temp;
    }

    return a2;
};

// run(solution);

measurePerformance(() => {
    assert(2, solution(3));
    assert(5, solution(20));
    assert(5, solution(841645));
});
