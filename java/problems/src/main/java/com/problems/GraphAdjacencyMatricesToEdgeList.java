import java.io.*;

public class GraphAdjacencyMatricesToEdgeList {
    static StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));
    static PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));

    static int nextInt() throws IOException {
        in.nextToken();
        return (int) in.nval;
    }

    public static void main(String[] args) throws IOException {
        int N = nextInt();
        // int sum[] = new int[((N - 1) / 2) * N / 2]; // n * (n + 1) / 2, there n = N -
        // 1

        for (int i = 1; i <= N; i++) {
            for (int j = 1; j <= N; j++) {
                if (nextInt() == 1 && j > i) {
                    out.println(i + " " + j);
                }
            }
        }

        out.flush();
    }
}
