const { assert, measurePerformance } = require('../../../Utils');

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
 * Implementation with Union-Find
 *
 * Time complexity : O(n), there 'n' is number of nodes
 * Space complexity : O(n), space for 2 arrays of parents and rank
 *
 * @param n: An integer
 * @param edges: a list of undirected edges
 * @return: the number of connected components in the graph
 */
// O(n) time | O(n) space
var countComponents = function(n, edges) {
// index in array is a node, value is index of root parent node.
// Initially each node connected to itself.
    const parents = Array.from(Array(n).keys()); // [0, 1, 2, .., n - 1]
// index in rank is node, value is num of connected nodes to it including itself.
// Initially as each node connected to itself then num equal to 1.
    const rank = new Array(n).fill(1); // [1, 1, .., 1]

    const find = (node) => {
        let root = node;
        while (root !== parents[root]) {
// compress path for O(1) lookup: (0) <- (1) <- (2) => (2) -> (0) <- (1)
            parents[root] = parents[parents[root]];
            root = parents[root];
        }
        return root;
    }

    const union = (n1, n2) => {
        let p1 = find(n1);
        let p2 = find(n2);

        if (p1 === p2) return 0;

        if (rank[p2] > rank[p1]) {
            parents[p1] = p2;
            rank[p2] += rank[p1];
        } else {
            parents[p2] = p1;
            rank[p1] += rank[p2];
        }
        return 1;
    }
// initially num of components = to num of nodes because they did not union yet
    let numComponents = n;

    for (const [n1, n2] of edges) {
        numComponents -= union(n1, n2);
    }

    return numComponents;
};

/**
 * Implementation with Depth-First Search
 *
 * Time: O(n + m), there n - number of nodes, m - number of edges
 * Space: O(n), space for adjacencyList and visited array
 *
 * @param n: An integer
 * @param edges: a list of undirected edges
 * @return: the number of connected components in the graph
 */
var countComponentsDFS = function(n, edges) {
    const adjacencyList = new Array(n);
    const visited = new Array(n);
    let count = 0;

    for (let i = 0; i < n; i++) {
        adjacencyList[i] = [];
        visited[i] = false;
    }

    for (const [v1, v2] of edges) {
        adjacencyList[v1].push(v2);
        adjacencyList[v2].push(v1);
    }

    // O(n + m)
    const dfs = (v) => {
        if (visited[v]) return;
        visited[v] = true;

        for (const v2 of adjacencyList[v]) {
            dfs(v2);
        }
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i);
            count++;
        }
    }

    return count;
};

const solutions = [
    countComponents, countComponentsDFS
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(2, solution(5, [[0, 1], [1, 2], [3, 4]]));
        assert(1, solution(5, [[0, 1], [1, 2], [2, 3], [3, 4]]));
    });
});
