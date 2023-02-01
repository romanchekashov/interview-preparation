const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://stepik.org/lesson/376267/step/5?unit=364077
 *
 * Количество пар с расстоянием больше либо равно D
 * На прямой расположено N деревьев. Для каждой пары рядом стоящих деревьев известно расстояние между ними.
 * Найти количество пар деревьев таких, что расстояние между ними больше либо равно D.
 * Дано N-1 целых чисел – расстояния между i-м и (i+1)-м деревом а также число D.
 *
 * Входные данные:
 * В первой строке два числа через пробел N и D. 1 ≤ N ≤ 100001. 1 ≤ D ≤ 10^9. В следующей строке через пробел находится N-1 число Ai – расстояние между i-м и (i+1)-м деревом. 1 ≤ Ai ≤ 10^9.
 *
 * Выходные данные:
 * В единственной строке вывести одно число – количество пар деревьев, таких, что расстояние между ними больше либо равно D.
 */

const solution1 = (args) => {
    const arr = args.split('\n');
    const line1 = arr[0].split(' ');
    const line2 = arr[1].split(' ');
    const treesAmount = parseInt(line1[0]), minDistance = parseInt(line1[1]);
    const distances = line2.map(v => parseInt(v));
    let treeIndex = 0, distanceIndex = 0, pairsNum = 0, distanceSum = 0;

    while (treeIndex < treesAmount - 1 && distanceIndex < distances.length) {
        distanceSum += distances[distanceIndex];
        if (distanceSum >= minDistance) {
            pairsNum += (treesAmount - treeIndex) - (distanceIndex - treeIndex) - 1;
            treeIndex++;
            distanceIndex = treeIndex;
            distanceSum = 0;
        } else {
            distanceIndex++;
        }
    }

    return pairsNum;
};

/**
 * treesAmount = 9, minDistance = 5
 * trees[3 7 2 5 1 1 4 2]: |___|_______|__|_____|_|_|____|__|
 * tree mark with numbers: 8___7_______6__5_____4_3_2____1__0
 *
 * Complexity analysis:
 * Time complexity: O(N * D)
 * Space complexity: O(1).
 *
 * @param args
 * @return {number}
 */
const solution2 = (args) => {
    const arr = args.split('\n');
    const line1 = arr[0].split(' ');
    const line2 = arr[1].split(' ');
    // read input
    const treesAmount = parseInt(line1[0]), minDistance = parseInt(line1[1]);
    const distances = line2.map(v => parseInt(v));

    let treeNumber = treesAmount - 1, distanceIndex = 0, pairsNum = 0, distanceSum = 0;
    let treesWithDistancesLessThenMinDistanceFromCurrentTree = 0;

    for (let i = 0, lastTreeToCheck = treesAmount - 2; i <= lastTreeToCheck; i++) {
        distanceIndex = i;
        distanceSum = distances[distanceIndex];
        treesWithDistancesLessThenMinDistanceFromCurrentTree = 0;

        while (distanceSum < minDistance) {
            distanceIndex++;
            treesWithDistancesLessThenMinDistanceFromCurrentTree++;
            distanceSum += distances[distanceIndex];
        }

        pairsNum += treeNumber - treesWithDistancesLessThenMinDistanceFromCurrentTree;
        treeNumber--;
    }

    return pairsNum;
};

const solution3 = (args) => {
    const arr = args.split('\n');
    const line1 = arr[0].split(' ');
    const line2 = arr[1].split(' ');
    // read input
    const N = parseInt(line1[0]), D = parseInt(line1[1]);

    // В этой задаче можно вначале проинициализировать массив с расстояниями каждого дерева от начала отсчёта:
    // список расстояний превращается в список координат
    const distances = new Array(N);
    distances[0] = 0;

    line2.forEach((v, index) => {
        distances[index + 1] = distances[index] + parseInt(v);
    });

    let i = 0, j = 0, num = 0;

    while (i < N && j < N) {
        if (distances[j] - distances[i] < D) {
            j++;
        } else {
            num += N - j;
            i++;
        }
    }

    return num;
};

// run(solution);

measurePerformance(() => {
});

const solutions = [
    solution1,
    solution2,
    solution3
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(29, solution('9 5\n3 7 2 5 1 1 4 2'));
    });
});
