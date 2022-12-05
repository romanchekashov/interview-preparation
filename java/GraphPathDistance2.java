import java.io.*;
import java.util.LinkedList;
import java.util.Queue;

public class GraphPathDistance2 {
    static StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));
    static PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));

    static int nextInt() throws IOException {
        in.nextToken();
        return (int) in.nval;
    }

    static int adjMat[][];
    static int distances[];
    static int NONE = -1;

    static void bfs(int start, int N) {
        Queue<Integer> q = new LinkedList();
        distances[start] = 0;
        q.offer(start);
        while (!q.isEmpty()) {
            int v = q.poll();
            for (int i = 0; i < N; i++) {
                if (adjMat[v][i] == 1 && distances[i] == NONE) {
                    distances[i] = distances[v] + 1;
                    q.offer(i);
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        int N = nextInt();
        adjMat = new int[N][N];

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                adjMat[i][j] = nextInt();
            }
        }

        int start = nextInt() - 1;
        int end = nextInt() - 1;

        distances = new int[N];
        for (int v = 0; v < N; v++) {
            distances[v] = NONE;
        }

        bfs(start, N);

        out.println(distances[end]);

        if (distances[end] > 0) {
            int[] way = new int[distances[end] + 1];
            way[0] = end;

            // начинаем с вершины B
            int v = end;
            // по всему пути
            for (int i = distances[end]; i >= 0; i--) {
                // записываем в путь
                way[i] = v;
                // по всем вершинам в поисках соседних
                for (int j = 0; j < N; j++) {
                    // есть ребро – соседняя и на один ближе
                    if (adjMat[v][j] == 1 && distances[j] == distances[v] - 1) {
                        // к новой вершине j
                        v = j;
                        // заканчиваем поиск
                        break;
                    }
                }
            }

            for (int i : way)
                out.print(++i + " ");
        }

        // out.println();

        // out.println(hasLoops ? "YES" : "NO");
        out.flush();
    }
}
