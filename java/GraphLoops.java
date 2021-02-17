package java;

import java.io.*;

public class GraphLoops {
    static StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));
    static PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));

    static int nextInt() throws IOException {
        in.nextToken();
        return (int) in.nval;
    }

    public static void main(String[] args) throws IOException {
        int N = nextInt();
        boolean hasLoops = false;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (nextInt() == 1 && i == j && !hasLoops) {
                    hasLoops = true;
                    break;
                }
            }
        }

        out.println(hasLoops ? "YES" : "NO");
        out.flush();
    }
}