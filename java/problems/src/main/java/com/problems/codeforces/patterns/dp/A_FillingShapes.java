package com.problems.codeforces.patterns.dp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

/**
 * A. Filling Shapes
 * https://codeforces.com/problemset/problem/1182/A
 *
 * The only line contains one integer n (1 <= n <= 60) — the length.
 */
public class A_FillingShapes {
    static int solution(int n) {
        int[] dp = new int[2];
        dp[0] = 1;
        dp[1] = 0;

        for (int i = 2; i <= n; i++) {
            dp[i % 2] = 2 * dp[(i - 2) % 2];
        }
        return dp[n % 2];
    }

    static int nextInt(StringTokenizer token) {
        return Integer.parseInt(token.nextToken());
    }

    static long nextLong(StringTokenizer token) {
        return Long.parseLong(token.nextToken());
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(new StringTokenizer(br.readLine()).nextToken());
        System.out.println(solution(n));
    }
}
