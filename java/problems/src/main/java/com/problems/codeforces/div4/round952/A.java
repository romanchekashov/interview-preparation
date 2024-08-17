package com.problems.codeforces.div4.round952;

import com.problems.codeforces.Template.ConsoleScanner;

import java.io.IOException;

/**
 * A. Creating Words
 * https://codeforces.com/contest/1985/problem/A
 */
public class A {

    static String solution(String words) {
        if (words.charAt(0) == words.charAt(4)) return words;
        char[] chars = words.toCharArray();
        var t = chars[0];
        chars[0] = chars[4];
        chars[4] = t;
        return new String(chars);
    }

    public static void main(String[] args) throws IOException {
        try (var console = new ConsoleScanner()) {
            int t = console.reader.nextInt();

            while (t-- > 0) {
                var words = console.reader.reader.readLine();
                console.writer.println(solution(words));
            }
        }
    }
}
