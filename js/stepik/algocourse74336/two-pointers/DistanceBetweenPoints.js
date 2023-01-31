const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://stepik.org/lesson/376267/step/3?unit=364077
 *
 * Расстояние между точками
 * На прямой находятся N точек, требуется подсчитать количество пар точек, расстояние между которыми ≥D.
 *
 * Входные данные:
 * В первой строке задано два целых числа N и D (2 ≤ N ≤ 300000, 1 ≤ D ≤ 10^9) – количество точек и расстояние.
 *
 * Во второй строке перечислены N положительных чисел D(1), …, D(N), где D(i) – координаты точек в порядке возрастания, все координаты различны.
 *
 * Выходные данные:
 * Вывести одно число – количество пар точек.
 *
 * @param args
 * @return {number}
 */
const solution = (args) => {
    const arr = args.split('\n');
    const line1 = arr[0].split(' ');
    const line2 = arr[1].split(' ');
    const N = parseInt(line1[0]), D = parseInt(line1[1]);
    const nums = line2.map(v => parseInt(v));
    let i = 0, j = 1, res = 0;

    while (i < N && j < N) {
        if (nums[j] - nums[i] < D) {
            j++;
        } else {
            res += N - j;
            i++;
        }
    }

    return res;
};

// run(solution);

measurePerformance(() => {
    assert(3, solution('4 4\n1 3 5 8'));
});
