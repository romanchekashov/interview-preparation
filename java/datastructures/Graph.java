package java.datastructures;

public class Graph<T> {
    private final int MAX_VERTS = 20;
    private T vertexList[]; // array of vertices
    private int adjMat[][]; // adjacency matrix
    private int nVerts; // current number of vertices
    // -------------------------------------------------------------

    public Graph() {
        vertexList = (T[]) new Object[MAX_VERTS];
        // adjacency matrix
        adjMat = new int[MAX_VERTS][MAX_VERTS];
        nVerts = 0;
        for (int j = 0; j < MAX_VERTS; j++)
            for (int k = 0; k < MAX_VERTS; k++)
                adjMat[j][k] = 0;
        // set adjacency // matrix to 0
    }
    // -------------------------------------------------------------

    public void addVertex(T vertex) {// argument is label
        vertexList[nVerts++] = vertex;
    }

    // -------------------------------------------------------------
    public void addEdge(int start, int end) {
        adjMat[start][end] = 1;
        adjMat[end][start] = 1;
    }

    // -------------------------------------------------------------
    public void displayVertex(int v) {
        System.out.print(vertexList[v].toString());
    }
    // -------------------------------------------------------------
}
