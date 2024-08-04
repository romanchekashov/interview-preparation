package codeforces.div2edu.round146;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class A {
    static String solution(long n, long k) {
        // 2 * x + k * y = n
        // x + (k / 2) * y = n / 2
        return (n % 2 == 0 || (n >= k && (k % 2 == 1))) ? "YES" : "NO";
    }

    static String solution2(long n, long k) {
        // 2 * x + k * y = n
        // (2 / n) * x + (k / n) * y = 1
        // (2 / n) * x = 1 || (k / n) * y = 1
        // x = n / 2 || y = n / k
        // 2 * x + 3 * y = 7 - wrong NO
        // (2 / 7) * x + (3 / 7) * y = 1
        if (2 + k == n) return "YES";
        return (n % 2 == 0 || n % k == 0) ? "YES" : "NO";
    }

    static String solution3(long n, long k) {
        // 2 * x + k * y = n
        // x = (n - k * y) / 2
        long y = 0;
        // (7 - 3 * y) / 2
        while (k * y <= n) {
            if ((n - k * y) % 2 == 0) return "YES";
            y++;
        }

        return "NO";
    }

    static int nextInt(StringTokenizer token) {
        return Integer.parseInt(token.nextToken());
    }

    static long nextLong(StringTokenizer token) {
        return Long.parseLong(token.nextToken());
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(new StringTokenizer(br.readLine()).nextToken());

        while (t-- > 0) {
            StringTokenizer token = new StringTokenizer(br.readLine());
            long n = nextLong(token);
            long k = nextLong(token);

            System.out.println(solution3(n, k));
        }
    }
}
