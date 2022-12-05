import java.io.*;

public class GraphUnordered {
    static StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));
    static PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));

    static int nextInt() throws IOException {
        in.nextToken();
        return (int) in.nval;
    }

    public static void main(String[] args) throws IOException {
        int N = nextInt();
        int graph[][] = new int[N][N];
        boolean isSimpleUnorderedGraph = true;
        boolean hasLoops = false;
        boolean isAsymmetricMatrix = false;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                graph[i][j] = nextInt();
                hasLoops = graph[i][j] == 1 && i == j;
                isAsymmetricMatrix = j <= i && graph[i][j] != graph[j][i];
                if (hasLoops || isAsymmetricMatrix) {
                    isSimpleUnorderedGraph = false;
                    break;
                }
            }
            if (!isSimpleUnorderedGraph)
                break;
        }

        out.println(isSimpleUnorderedGraph ? "YES" : "NO");
        out.flush();
    }
}
