package com.problems.codeforces.div4.round952;

import com.problems.codeforces.Template.ConsoleScanner;

import java.io.IOException;

/**
 * D. Manhattan Circle
 * https://codeforces.com/contest/1985/problem/D
 */
public class D {

    static String solution(char[][] grid) {
        int i = 0, j = 0;
        l:for (i = 0; i < grid.length; i++) {
            for (j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '#') break l;
            }
        }

        int i2 = i;
        while (i2 < grid.length && grid[i2][j] == '#') i2++;

        if (i2 == grid.length || grid[i2][j] == '.') i2--;

//        System.out.println("---" + i + " " + i2);

        if (i2 == i) return (i + 1) + " " + (j + 1);
        return (i + ((i2 - i) / 2 + 1)) + " " + (j + 1);
    }

    public static void main(String[] args) throws IOException {
        try (var console = new ConsoleScanner()) {
            int t = console.reader.nextInt();

            while (t-- > 0) {
                int n = console.reader.nextInt();
                int m = console.reader.nextInt();

                char[][] grid = new char[n][m];
                for (int i = 0; i < n; i++) {
                    grid[i] = console.reader.next().toCharArray();
                }

                console.writer.println(solution(grid));
            }
        }
    }
}
