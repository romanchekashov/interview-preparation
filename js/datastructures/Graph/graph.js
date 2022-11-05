const { assert, measurePerformance } = require('../../Utils');

/**
 * Graph traversal:
 *
 * Depth first: Stack
 * Breadth first: Queue
 */

/**
 * Graph traversal: Depth first: Stack
 * @param graph
 * @param startNode
 */
const depthFirstPrint = (graph, startNode) => {
    let result = '';
    const stack = [startNode];

    while (stack.length) {
        const currentNode = stack.pop();
        console.log(currentNode);
        result += currentNode;
        graph[currentNode].forEach(node => stack.push(node));
    }

    return result;
};

const depthFirstPrintRecursive = (graph, startNode) => {
    let result = startNode;
    console.log(startNode);
    graph[startNode].forEach(node => result += depthFirstPrintRecursive(graph, node));
    return result;
};

/**
 * Graph traversal: Breadth first: Queue
 * @param graph
 * @param startNode
 */
const breadthFirstPrint = (graph, startNode) => {
    let result = '';
    const queue = [startNode];

    while (queue.length) {
        const currentNode = queue.shift();
        console.log(currentNode);
        result += currentNode;
        graph[currentNode].forEach(node => queue.push(node));
    }

    return result;
};

/**
 * Adjacency list - https://en.wikipedia.org/wiki/Adjacency_list
 * In graph theory and computer science, an adjacency list is
 * a collection of unordered lists used to represent a finite graph.
 *
 */
const graph = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: []
};

measurePerformance(() => {
    console.log(`Run tests for: ${depthFirstPrint.name}`);
    assert('acebdf', depthFirstPrint(graph, 'a'));
    console.log(`Run tests for: ${depthFirstPrintRecursive.name}`);
    assert('abdfce', depthFirstPrintRecursive(graph, 'a'));

    console.log(`Run tests for: ${breadthFirstPrint.name}`);
    assert('abcdef', breadthFirstPrint(graph, 'a'));
});
