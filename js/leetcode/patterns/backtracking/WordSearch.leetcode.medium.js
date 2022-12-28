const { assert, measurePerformance } = require('./../../../Utils');

/**
 * https://leetcode.com/problems/word-search/
 * 79. Word Search
 *
 * Given an m x n grid of characters board and a string word, return true if word exists in the grid.
 *
 * The word can be constructed from letters of sequentially adjacent cells,
 * where adjacent cells are horizontally or vertically neighboring.
 * The same letter cell may not be used more than once.
 *
 * Follow up: Could you use search pruning to make your solution faster with a larger board?
 *
 * Testcase 1:
 * Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
 * Output: true
 *
 * Testcase 2:
 * Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
 * Output: true
 *
 * Testcase 3:
 * Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
 * Output: false
 */

/**
 *
 * Time complexity : O(m * n * 3^w), where 'w' - word.length
 * Space complexity : O(w)
 *
 * @param {char[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (dfs(board, i, j, word)) {
                return true;
            }
        }
    }
    return false;
};

function dfs(board, i, j, word) {
    if (!word.length) {
        return true;
    }

    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] !== word[0]) {
        return false;
    }

    const c = board[i][j];
    board[i][j] = '*'; // This is '*' method the search pruning approach where we do not have to use the extra visited array!
    const s = word.substr(1);
    const ret = dfs(board, i - 1, j, s) || dfs(board, i + 1, j, s) || dfs(board, i, j - 1, s) || dfs(board, i, j + 1, s);
    board[i][j] = c;

    return ret;
}

const solutions = [
    exist
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(true, solution([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"));
        assert(true, solution([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"));
        assert(false, solution([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"));
    });
});
