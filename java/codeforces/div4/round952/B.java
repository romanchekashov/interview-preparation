package codeforces.div4.round952;

import codeforces.Template.ConsoleScanner;

import java.io.IOException;

/**
 * A. Creating Words
 * https://codeforces.com/contest/1985/problem/A
 */
public class A {

    static String solution(char[] words) {
        if (words[0] == words[4]) return new String(words);
        var t = words[0];
        words[0] = words[4];
        words[4] = t;
        return new String(words);
    }

    public static void main(String[] args) throws IOException {
        try (var console = new ConsoleScanner()) {
            int t = console.reader.nextInt();

            while (t-- > 0) {
                var words = console.reader.reader.readLine().toCharArray();
                console.writer.println(solution(words));
            }
        }
    }
}
