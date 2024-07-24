package codeforces.div4.round952;

import codeforces.Template.ConsoleScanner;

import java.io.IOException;

/**
 * B. Maximum Multiple Sum
 * https://codeforces.com/contest/1985/problem/B
 */
public class B {

    static int solution(int n) {
        int maxSum = 0, x = 2;
        for (; x <= n; x++) {
            int sum = 0;
            for (int j = 1; j * x <= n; j++) {
                sum += j * x;
            }
            if (maxSum != 0 && sum < maxSum) return x - 1;
            if (sum > maxSum) maxSum = sum;
        }
        return x - 1;
    }

    public static void main(String[] args) throws IOException {
        try (var console = new ConsoleScanner()) {
            int t = console.reader.nextInt();

            while (t-- > 0) {
                var n = console.reader.nextInt();
                console.writer.println(solution(n));
            }
        }
    }
}
