const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://leetcode.com/problems/coin-change-ii/
 * 518. Coin Change II
 *
 * You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
 *
 * Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.
 *
 * You may assume that you have an infinite number of each kind of coin.
 *
 * The answer is guaranteed to fit into a signed 32-bit integer.
 *
 * Example 1:
 * Input: amount = 5, coins = [1,2,5]
 * Output: 4
 * Explanation: there are four ways to make up the amount:
 * 5=5
 * 5=2+2+1
 * 5=2+1+1+1
 * 5=1+1+1+1+1
 *
 * Example 2:
 * Input: amount = 3, coins = [2]
 * Output: 0
 * Explanation: the amount of 3 cannot be made up just with coins of 2.
 *
 * Example 3:
 * Input: amount = 10, coins = [10]
 * Output: 1
 *
 * Constraints:
 * 1 <= coins.length <= 300
 * 1 <= coins[i] <= 5000
 * All the values of coins are unique.
 * 0 <= amount <= 5000
 */

/**
 * Complexity: O(coins.length * amount) time | O((coins.length + 1) * (amount + 1)) space
 *
 * Example 1:
 * Input: amount = 5, coins = [1,2,5]
 * amount  | 0, 1, 2, 3, 4, 5
 * ways
 * []      | 1, 0, 0, 0, 0, 0
 * [1]     | 1, 1, 1, 1, 1, 1
 * [1,2]   | 1, 1, 2, 2, 3, 3
 * [1,2,5] | 1, 1, 2, 2, 3, 4 <- solution
 *
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
    const dp = new Array(coins.length + 1);

    for (let i = 0; i < coins.length + 1; i++) {
        dp[i] = new Array(amount + 1).fill(0);
        dp[i][0] = 1;
    }

    let j = 0;
    for (const coin of coins) {
        j++;
        for (let curAmount = 0; curAmount < amount + 1; curAmount++) {
            if (coin <= curAmount) {
                dp[j][curAmount] = dp[j - 1][curAmount] + dp[j][curAmount - coin];
            } else {
                dp[j][curAmount] = dp[j - 1][curAmount];
            }
        }
    }

    // console.log(dp)
    return dp[j][amount];
};

/**
 * Complexity: O(coins.length * amount) time | O((amount + 1)) space
 *
 * 1 - Состояние: dp[i] - number of ways to make change for amount i
 * 2 - База: Вычисляем значения когда у нас нет монет, тогда есть только 1 способ собрать сдачу для 0 и 0 способов собрать сдачу отличную от 0. Используй интуицию!
 *     Без разницы сколько у тебя монет и какого они номинала и если они вообще: существуют только 1 способ собрать нулевую сдачу!!!
 * 3 - Формула: dp[i] = dp[i] + dp[i - coin]. Заметим, что при вычислении [i] значения динамики мы опираемся на предыдущее значение в клетке i и значение клетки [i - coin] элементы.
 * 4 - Порядок: Значит состояние нужно перебирать по возрастанию i.
 * 5 - Ответ: хранится в dp[n].
 *
 * @param amount
 * @param coins
 * @return {any}
 */
var changeOptimizedSpace = function(amount, coins) {
    const dp = new Array(amount + 1).fill(0);

    dp[0] = 1; // base

    for (const coin of coins) {
        for (let curAmount = 1; curAmount < amount + 1; curAmount++) {
            if (coin <= curAmount) {
                dp[curAmount] += dp[curAmount - coin];
            }
        }
        // console.log(dp)
    }

    // console.log(dp)
    return dp[amount];
};

const solutions = [
    change, changeOptimizedSpace
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(4, solution(5, [1,2,5]));
        assert(0, solution(3, [2]));
        assert(1, solution(10, [10]));
    });
});
