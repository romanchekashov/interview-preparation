const { assert, measurePerformance } = require('./../../../Utils');

/**
 * https://leetcode.com/problems/search-a-2d-matrix/
 * 74. Search a 2D Matrix
 *
 * You are given an m x n integer matrix with the following two properties:
 *
 * Each row is sorted in non-decreasing order.
 * The first integer of each row is greater than the last integer of the previous row.
 * Given an integer target, return true if target is in matrix or false otherwise.
 *
 * You must write a solution in O(log(m * n)) time complexity.
 *
 *
 * Example 1:
 * Input: matrix = [
 * [1,3,5,7],
 * [10,11,16,20],
 * [23,30,34,60]], target = 3
 * Output: true
 *
 * Example 2:
 * Input: matrix = [
 * [1,3,5,7],
 * [10,11,16,20],
 * [23,30,34,60]], target = 13
 * Output: false
 */

/**
 *
 * Time complexity : O(log(m * n))
 * Space complexity : O(1)
 *
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    // find row
    let rowStart = 0, rowEnd = matrix.length - 1, rowIndex = 0;

    while (rowStart <= rowEnd) {
        rowIndex = Math.floor((rowStart + rowEnd) / 2)

        // console.log(rowIndex, matrix[rowIndex], rowEnd, rowStart)

        if (target < matrix[rowIndex][0]) {
            rowEnd = rowIndex - 1
        } else if (target > matrix[rowIndex][matrix[rowIndex].length - 1]) {
            rowStart = rowIndex + 1
        } else {
            break
        }
    }

    const row = matrix[rowIndex];
    // console.log('searchMatrix', row, rowIndex)
    // find target
    let start = 0, end = row.length - 1;

    while(start <= end) {
        let k = Math.floor((start + end) / 2)

        if (target > row[k]) {
            start = k + 1
        } else if (target < row[k]) {
            end = k - 1
        } else {
            return true
        }
    }

    return false
};

const solutions = [
    searchMatrix
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(true, solution([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3));
        assert(false, solution([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13));
        assert(false, solution([[1,3]], 2));
        assert(true, solution([[1,3,5,7],[10,11,16,20],[23,30,34,50]], 11));
    });
});
