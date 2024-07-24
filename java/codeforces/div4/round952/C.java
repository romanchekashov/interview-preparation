package codeforces.div4.round952;

import codeforces.Template.ConsoleScanner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * C. Good Prefixes
 * https://codeforces.com/contest/1985/problem/C
 */
public class C {

    static int solution(int[] items) {
        int goodPrefixes = 0;
        int maxSoFar = Integer.MIN_VALUE;
        long sum = 0;

        for (int item : items) {
            sum += item;
            if (item > maxSoFar) maxSoFar = item;
            if (sum == 2L * maxSoFar) goodPrefixes++;
        }
        return goodPrefixes;
    }

    public static void main(String[] args) throws IOException {
        try (var console = new ConsoleScanner()) {
            int t = console.reader.nextInt();

            while (t-- > 0) {
                var n = console.reader.nextInt();
                int[] items = new int[n];
                for (int i = 0; i < n; i++) {
                    items[i] = console.reader.nextInt();
                }
                console.writer.println(solution(items));
            }
        }
    }
}
