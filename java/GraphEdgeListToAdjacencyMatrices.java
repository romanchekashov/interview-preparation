package java;

import java.io.*;

public class GraphEdgeListToAdjacencyMatrices {
    static StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));
    static PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));

    static int nextInt() throws IOException {
        in.nextToken();
        return (int) in.nval;
    }

    public static void main(String[] args) throws IOException {
        int N = nextInt();
        int M = nextInt();
        int graph[][] = new int[N][N];
        // int sum[] = new int[((N - 1) / 2) * N / 2]; // n * (n + 1) / 2, there n = N -
        // 1
        for (int i = 0; i < M; i++) {
            int x = nextInt() - 1;
            int y = nextInt() - 1;
            graph[x][y] = 1;
            graph[y][x] = 1;
        }

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                out.print(graph[i][j] + " ");
            }
            out.println();
        }

        out.flush();
    }
}