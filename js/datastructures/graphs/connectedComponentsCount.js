const { assert, measurePerformance } = require('../../Utils');

/**
 * Write a function, connectedComponentsCount, that takes in the adjacency list of an undirected graph.
 * The function should return the number of connected components within the graph.
 * @param graph
 */
const connectedComponentsCount = (graph) => {
    //
}


measurePerformance(() => {
    const test_00_graph = {
        0: [8, 1, 5],
        1: [0],
        5: [0, 8],
        8: [0, 5],
        2: [3, 4],
        3: [2, 4],
        4: [3, 2]
    };
    console.log(`Run test_00: connectedComponentsCount(graph), graph = `, test_00_graph);
    assert(true, connectedComponentsCount(test_00_graph));
});
