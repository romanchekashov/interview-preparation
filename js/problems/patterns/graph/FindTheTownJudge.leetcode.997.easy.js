const { assert, measurePerformance } = require('../../../Utils');

/**
 * https://leetcode.com/problems/find-the-town-judge/
 *
 * 997. Find the Town Judge
 *
 * In a town, there are n people labeled from 1 to n.
 * There is a rumor that one of these people is secretly the town judge.
 *
 * If the town judge exists, then:
 * The town judge trusts nobody.
 * Everybody (except for the town judge) trusts the town judge.
 * There is exactly one person that satisfies properties 1 and 2.
 *
 * You are given an array 'trust' where 'trust[i] = [a(i), b(i)]'
 * representing that the person labeled a(i) trusts the person labeled b(i).
 * If a trust relationship does not exist in trust array, then such a trust relationship does not exist.
 *
 * Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.
 */

/**
 * Complexity analysis:
 * Time complexity : O(n).
 * Space complexity : O(n).
 *
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function(n, trust) {
    // at least (n - 1) people should trust to 1 judge
    if (trust.length < n - 1) return -1;

    const adjustancyList = {};

    for (const [a, b] of trust) {
        if (!adjustancyList[a]) {
            adjustancyList[a] = new Set();
        }
        adjustancyList[a].add(b);
    }

    const judges = [];
    for (let i = 1; i <= n; i++) {
        if (!adjustancyList[i]) {
            judges.push(i);
        }
    }

    // only 1 judge should exist
    if (judges.length > 1) return -1;

    const judge = judges[0];

    return Object.keys(adjustancyList).every(i => adjustancyList[i].has(judge)) ? judge : -1;
};

/**
 * Intuition:
 * Consider trust as a graph, all pairs are directed edge.
 * The point with 'in-degree - out-degree = N - 1' become the judge.
 *
 * Explanation:
 * Count the degree, and check at the end.
 *
 * Complexity:
 * Time O(T + N), Space O(N)
 *
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge2 = function(n, trust) {
    const count = new Array(n + 1).fill(0);

    for (const t of trust) {
        count[t[0]]--;
        count[t[1]]++;
    }

    for (let i = 1; i <= n; ++i) {
        if (count[i] === n - 1) return i;
    }
    return -1;
};

const solutions = [
    findJudge,
    findJudge2
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(-1, solution(2, []));
        assert(2, solution(2, [[1,2]]));
        assert(3, solution(3, [[1,3],[2,3]]));
        assert(-1, solution(3, [[1,3],[2,3],[3,1]]));
    });
});
