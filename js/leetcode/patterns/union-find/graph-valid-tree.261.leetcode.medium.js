const { assert, measurePerformance } = require('./../../../Utils');

/**
 * https://leetcode.com/problems/graph-valid-tree/
 * 261. Graph Valid Tree
 *
 * Given 'n' nodes labeled from '0' to 'n - 1' and a list of 'undirected' edges (each edge is a pair of nodes),
 * write a function to check whether these edges make up a valid tree.
 *
 * Hint: You can assume that no duplicate edges will appear in edges.
 * Since all edges are 'undirected', '[0, 1]' is the same as '[1, 0]' and thus will not appear together in edges.
 */

/**
 * Made directly with the most basic template of Union Find.
 * This question is a two-step process:
 * 1. Judging that the number of edges must be equal to n-1
 * 2. The total number of connected graphs is 1.
 * This ensures that all points in the graph are connected and acyclic.
 *
 * @param n: An integer
 * @param edges: a list of undirected edges
 * @return: true if it's a valid tree, or false
 */
var validTree = function(n, edges) {
    // write your code here
    if(n <= 0 || edges === null) {
        return false;
    }

    if(edges.length !== n - 1) {
        return false;
    }

    const uf = new UnionFind(n);

    for(const edge of edges) {
        const num1 = edge[0];
        const num2 = edge[1];
        uf.connect(num1, num2);
    }

    return uf.getCount() === 1;
};

class UnionFind{
    _father; // int[]
    _count; // int

    constructor(n) {
        this._father = new Array(n);
        this._count = n;

        for(let i = 0; i < n; i++) {
            this._father[i] = i;
        }
    }

    getCount() {
        return this._count;
    }

    find(x) {
        if(this._father[x] === x) {
            return x;
        }

        return this._father[x] = this.find(this._father[x]);
    }

    connect(a, b) {
        let rootA = this.find(a);
        let rootB = this.find(b);

        if(rootA !== rootB) {
            this._father[rootA] = rootB;
            this._count--;
        }
    }
}


/**
 * Made directly with the most basic template of Union Find.
 * This question is a two-step process:
 * 1. Judging that the number of edges must be equal to n-1
 * 2. The total number of connected graphs is 1.
 * This ensures that all points in the graph are connected and acyclic.
 *
 * @param n: An integer
 * @param edges: a list of undirected edges
 * @return: true if it's a valid tree, or false
 */
var validTreeUnionFind = function(n, edges) {
    // A tree is a connected acyclic graph that consists of n nodes and n − 1 edges.
    if (edges.length !== n - 1) return false;

    const parents = Array.from(Array(n).keys());
    const ranks = new Array(n).fill(1);

    const findParent = (i) => {
        let root = i;

        while (parents[root] !== root) {
            // compress path for O(1) lookup: (0) <- (1) <- (2) => (2) -> (0) <- (1)
            parents[root] = parents[parents[root]];
            root = parents[root];
        }

        return root;
    }

    const union = (n1, n2) => {
        const p1 = findParent(n1);
        const p2 = findParent(n2);

        if (p1 === p2) return 0;

        if (ranks[p1] > ranks[p2]) {
            ranks[p1] += ranks[p2];
            parents[p2] = p1;
        } else {
            ranks[p2] += ranks[p1];
            parents[p1] = p2;
        }

        return 1;
    }

    // initially number of components equals to number of nodes because they did not union yet
    let numComponents = n;

    for (const [n1, n2] of edges) {
        numComponents -= union(n1, n2);
    }

    return numComponents === 1;
};

const solutions = [
    validTree, validTreeUnionFind
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(true, solution(5, [[0, 1], [0, 2], [0, 3], [1, 4]]));
        assert(false, solution(5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]));
    });
});
