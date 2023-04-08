const { assert, measurePerformance } = require('./../../Utils');

/**
 * O(n) time | O(n) space
 *
 * @tag two-pointers
 * @param {number[]} sortedIntArray sorted array of integer numbers
 * @return {number[]} result sorted array with square integer numbers from provided array
 */
function getSortedIntArrayWithSquaredValues(sortedIntArray) {
    const result = new Array(sortedIntArray.length);
    let left = 0, right = sortedIntArray.length - 1, resultCurrentIdx = sortedIntArray.length - 1;

    while (left <= right) {
        if (Math.abs(sortedIntArray[left]) > Math.abs(sortedIntArray[right])) {
            result[resultCurrentIdx--] = sortedIntArray[left] * sortedIntArray[left]
            left++;
        } else {
            result[resultCurrentIdx--] = sortedIntArray[right] * sortedIntArray[right]
            right--;
        }
    }

    return result;
}

const solutions = [getSortedIntArrayWithSquaredValues];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([], solution([]));
        assert([1, 9, 25], solution([-5, 1, 3]));
        assert([0, 1, 4, 9, 25], solution([-5, -2, 0, 1, 3]));
        assert([1, 9, 25], solution([-5, -3, -1]));
    });
});
