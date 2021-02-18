/**
 * A TREE is an UNDIRECTED GRAPH which satisfies any of the following definitions:
 * - An acyclic(NO cycles) connected graph.
 * - A connected graph with N nodes and N-1 edges.
 * - An graph in which any two vertices are connected by exactly one path.
 *
 * A TREE is a connected graph without cycles.
 * Each tree has a ROOT node.
 * The root node has zero or more child nodes.
 * Each child node has zero or more child nodes, and so on.
 * A node is called a "LEAF" node if it has no children.
 *
 * Q: What is the parent of the root node?
 * A: It has no parent, although it may be useful to assign the parent of the root node
 * to be itself (e. g. file system).
 */
class Node {
    name;
    children; // []
}

class Tree {
    root; // Node
}
