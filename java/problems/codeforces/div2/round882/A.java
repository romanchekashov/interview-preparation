package codeforces.div2.round882;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.StringTokenizer;

/**
 * A. The Man who became a God
 * https://codeforces.com/contest/1847/problem/A
 *
 * https://codeforces.com/blog/entry/117928?locale=en
 */
public class A {
    static long solution(int n, int k, int[] suspicions) {
//        System.out.println(Arrays.toString(suspicions));
        long ans = 0;
        List<Integer> b = new ArrayList<>();

        for (int i = 1; i < n; i++) {
            b.add(Math.abs(suspicions[i] - suspicions[i - 1]));
            ans += b.get(b.size() - 1);
        }

        b.sort(Collections.reverseOrder());
//        System.out.println(b.stream().map(Object::toString).collect(Collectors.joining(", ")));

        for (int i = 0; i < k - 1; i++) {
            ans -= b.get(i);
        }
        return ans;
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
            int n = nextInt(token);
            int k = nextInt(token);

            token = new StringTokenizer(br.readLine());
            int[] suspicions = new int[n];
            for (int i = 0; i < n; i++) suspicions[i] = nextInt(token);

            System.out.println(solution(n, k, suspicions));
        }
    }
}
