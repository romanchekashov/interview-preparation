/**
 * https://github.com/williamfiset/Algorithms/blob/master/src/main/java/com/williamfiset/algorithms/datastructures/unionfind/UnionFind.java
 *
 * Union Find is a data structure that keeps track of elements which are
 * split into one or more disjoint sets.
 * Its has two primary operations: find and union.
 */
class UnionFind {
    // The number of elements in this union find(UnionFind/Disjoint set)
    size; // int

    // Used to track the size of each of the component
    sz; // int[]

    // id[i] points to the parent of i, if id[i] = i then i is a root node
    id; // int[]

    // Tracks the number of components in the union find(number of remaining components/sets)
    numComponents; // int

    constructor(size) {
        if (size <= 0) {
            throw new Error('Size <= 0 is not allowed');
        }

        this.size = this.numComponents = size;
        this.sz = []; // new int[size];
        this.id = []; // new int[size];

        for (let i = 0; i < size; i++) {
            this.id[i] = i; // Link to itself (self root)
            this.sz[i] = 1; // Each component is originally of size one
        }
    }

    // Find which component/set 'p' belongs to, takes amortized constant time.
    find(p) {
        // Find the root of the component/set
        let root = p;

        while (root !== this.id[root]) {
            root = this.id[root];
        }

        // Compress the path leading back to the root.
        // Doing this operation is called "path compression"
        // and is what gives us amortized time complexity.
        while (p !== root) {
            const next = this.id[p];
            this.id[p] = root;
            p = next;
        }

        return root;
    }

    // This is an alternative recursive formulation for the find method
    // public int find(int p) {
    //   if (p == id[p]) return p;
    //   return id[p] = find(id[p]);
    // }

    // Return whether or not the elements 'p' and
    // 'q' are in the same components/set.
    connected(p, q) {
        return this.find(p) === this.find(q);
    }

    // Return the size of the components/set 'p' belongs to
    componentSize(p) {
        return this.sz[this.find(p)];
    }

    // Return the number of elements in this UnionFind/Disjoint set
    getSize() {
        return this.size;
    }

    // Returns the number of remaining components/sets
    getNumComponents() {
        return this.numComponents;
    }

    // Unify the components/sets containing elements 'p' and 'q'
    unify(p, q) {

        // These elements are already in the same group!
        if (this.connected(p, q)) return;

        const root1 = this.find(p);
        const root2 = this.find(q);

        // Merge smaller component/set into the larger one.
        if (this.sz[root1] < this.sz[root2]) {
            this.sz[root2] += this.sz[root1];
            this.id[root1] = root2;
            this.sz[root1] = 0;
        } else {
            this.sz[root1] += this.sz[root2];
            this.id[root2] = root1;
            this.sz[root2] = 0;
        }

        // Since the roots found are different we know that the
        // number of components/sets has decreased by one
        this.numComponents--;
    }
}

module.exports = {
    UnionFind
};
