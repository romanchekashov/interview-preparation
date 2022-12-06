const { assert, measurePerformance } = require('./../../../Utils');

/**
 * https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/
 * 323. Number of Connected Components in an Undirected Graph
 *
 * You have a graph of 'n' nodes. You are given an integer 'n' and an array 'edges'
 * where 'edges[i] = [a(i), b(i)]' indicates that there is an edge between 'a(i)' and 'b(i)' in the graph.
 *
 * Return the number of connected components in the graph.
 *
 * https://youtu.be/8f1XPm4WOUc
 */

/**
 * Time complexity : O(n), there 'n' is number of nodes
 * Space complexity : O(n), space for 2 arrays of parents and rank
 *
 * @param n: An integer
 * @param edges: a list of undirected edges
 * @return: the number of connected components in the graph
 */
var countComponents = function(n, edges) {
    // index in array is a node, value is index of parent node. Initially each node connected to itself.
    const parents = Array.from(Array(n).keys()); // [0, 1, 2, .., n - 1]
    // index in rank is a node, value is a number of connected nodes to it including itself.
    // Initially as each node connected to itself then number equal to 1.
    const rank = new Array(n).fill(1); // [1, 1, .., 1]

    const find = (node) => {
        let res = node;

        while (res !== parents[res]) {
            parents[res] = parents[parents[res]];
            res = parents[res];
        }

        return res;
    }

    const union = (n1, n2) => {
        let p1 = find(n1);
        let p2 = find(n2);

        if (p1 === p2) {
            return 0;
        }

        if (rank[p2] > rank[p1]) {
            parents[p1] = p2;
            rank[p2] += rank[p1];
        } else {
            parents[p2] = p1;
            rank[p1] += rank[p2];
        }

        return 1;
    }

    let res = n;

    for (const [n1, n2] of edges) {
        res -= union(n1, n2);
    }

    return res;
};

const solutions = [
    countComponents
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(2, solution(5, [[0, 1], [1, 2], [3, 4]]));
        assert(1, solution(5, [[0, 1], [1, 2], [2, 3], [3, 4]]));
    });
});
