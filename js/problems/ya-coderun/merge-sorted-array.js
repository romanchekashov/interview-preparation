const { assert, measurePerformance } = require('../../Utils');

/**
 * @param {number[]} nums1 - первый отсортированный массив
 * @param {number} m - количество значимых элементов в nums1
 * @param {number[]} nums2 - второй отсортированный массив
 * @param {number} n - количество элементов в nums2
 * @return {void} Не возвращайте ничего, вместо этого модифицируйте nums1.
 */
const solution1 = function merge(nums1, m, nums2, n) {
    // ваш код здесь
    let i = nums1.length - 1;
    m--;
    n--;
    while (m >= 0 && n >= 0) {
        if (nums2[n] > nums1[m]) {
            nums1[i] = nums2[n--];
        } else {
            nums1[i] = nums1[m--];
        }
        i--;
    }
    while (n >= 0) nums1[i--] = nums2[n--];
    return nums1;
};

const solutions = [solution1];

solutions.forEach((solution) => {
    console.log(`Run tests for: [${solution.name}]`);
    measurePerformance(() => {
        assert(
            [18, 29, 46, 55, 80, 88, 90],
            solution([46, 55, 88, 0, 0, 0, 0], 3, [18, 29, 80, 90], 4)
        );
    });
});
