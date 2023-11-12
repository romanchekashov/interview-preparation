package codeforces.div3.round883;

import codeforces.Template.ConsoleScanner;

import java.io.IOException;

/**
 * A. Rudolph and Cut the Rope
 * https://codeforces.com/contest/1846/problem/A
 */
public class A {

    static int solution(int n, int[] a_nails_heights, int[] b_ropes_lengths) {
        int min_ropes_to_cut = 0;
        for (int i = 0; i < n; i++) {
            if (a_nails_heights[i] > b_ropes_lengths[i]) min_ropes_to_cut++;
        }
        return min_ropes_to_cut;
    }

    public static void main(String[] args) throws IOException {
        try (var console = new ConsoleScanner()) {
            int t = console.reader.nextInt();

            while (t-- > 0) {
                int n = console.reader.nextInt();

                int[] a_nails_heights = new int[n];
                int[] b_ropes_lengths = new int[n];

                for (int i = 0; i < n; i++) {
                    a_nails_heights[i] = console.reader.nextInt();
                    b_ropes_lengths[i] = console.reader.nextInt();
                }

                console.writer.println(solution(n, a_nails_heights, b_ropes_lengths));
            }
        }
    }
}
