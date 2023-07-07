package codeforces.div2.round882;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

/**
 * B. Hamon Odyssey
 * https://codeforces.com/contest/1847/problem/B
 *
 * https://codeforces.com/blog/entry/117928?locale=en
 */
public class B {

    static int solution(int n, int[] powers) {
        int ans = 0, sum = Integer.MAX_VALUE;

        for (int i = 0; i < n; i++) {
            sum &= powers[i];
//            System.out.println(String.format("%d %d sum = %d ans = %d", i, powers[i], sum, ans));
            if (sum == 0) {
                ans++;
                sum = Integer.MAX_VALUE;
            }
        }
        return Math.max(ans, 1);
    }

    static int solution2(int n, int[] powers) {
        int cur = powers[0];
        int part = 1;

        for(int i = 0; i < n; i++){
            cur &= powers[i];
            if (cur == 0) {
                if(i == n-1) break;
                part++;
                cur = powers[i + 1];
            }
        }

        if(cur != 0) part--;

        return Math.max(part, 1);
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
            String sPower = br.readLine();
            int[] powers = Arrays.stream(sPower.split(" ")).mapToInt(Integer::parseInt).toArray();

            System.out.println(solution(n, powers));
        }
    }
}
