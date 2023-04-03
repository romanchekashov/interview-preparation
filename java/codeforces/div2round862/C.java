package codeforces.div2round862;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import java.util.stream.Stream;

public class C {
    static String[] canIntersect(int k, int a, int b, int c) {
        int _b = b - k;

        long discriminant = (long) _b * _b - 4L * a * c;

        if (discriminant < 0) return new String[]{"YES", String.valueOf(k)};

        return new String[]{"NO"};
    }

    static void solution(List<Integer> kArr, List<Integer[]> abcArr) {
        // O(M), where M number of parabola
        abcArr
                .stream()
                .map(abc -> {
                    String[] result = null;

                    // O(N), where N number of lines
                    for (int k : kArr) {
                        result = canIntersect(k, abc[0], abc[1], abc[2]);
                        if (result.length > 1) {
                            break;
                        }
                    }

                    return result != null ? result : new String[]{"NO"};
                })
                .flatMap(Stream::of)
                .forEach(System.out::println);
        System.out.println();
    }

    static int nextInt(StringTokenizer token) {
        return Integer.parseInt(token.nextToken());
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(new StringTokenizer(br.readLine()).nextToken());

        while (t-- > 0) {
            StringTokenizer token = new StringTokenizer(br.readLine());
            int n = nextInt(token);
            int m = nextInt(token);

            List<Integer> kArr = new ArrayList(n);

            while (n-- > 0) {
                kArr.add(Integer.parseInt(new StringTokenizer(br.readLine()).nextToken()));
            }

            List<Integer[]> abcArr = new ArrayList(m);

            while (m-- > 0) {
                token = new StringTokenizer(br.readLine());
                abcArr.add(new Integer[]{nextInt(token), nextInt(token), nextInt(token)});
            }

            solution(kArr, abcArr);
        }
    }
}
