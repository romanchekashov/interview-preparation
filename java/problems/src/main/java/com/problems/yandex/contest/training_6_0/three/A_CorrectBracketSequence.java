package com.problems.yandex.contest.training_6_0.three;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Map;
import java.util.StringTokenizer;

///
/// #### Тренировки по алгоритмам 6.0 от Яндекса — Занятие 3
/// ### A. Правильная скобочная последовательность
///
/// Рассмотрим последовательность, состоящую из круглых, квадратных и фигурных скобок. Программа должна определить, является ли данная скобочная последовательность правильной. Пустая последовательность является правильной. Если A — правильная, то последовательности (A), [A], {A} — правильные. Если A и B — правильные последовательности, то последовательность AB — правильная.
///
/// #### Формат ввода
/// В единственной строке записана скобочная последовательность, содержащая не более 100000 скобок.
///
/// #### Формат вывода
/// Если данная последовательность правильная, то программа должна вывести строку "yes", иначе строку "no".
///
/// - Ограничение времени	1 секунда
/// - Ограничение памяти	64Mb
///
public class A_CorrectBracketSequence {

    static String solution(String line) {
        var stack = new ArrayList<Character>();
        var openToCloseMap = Map.of('(', ')', '[', ']', '{', '}');

        for (char c : line.toCharArray()) {
            var close = openToCloseMap.get(c);

            if (close != null) {
                stack.add(close);
            } else if (stack.isEmpty() || stack.getLast() != c) {
                return "no";
            } else {
                stack.removeLast();
            }
        }
        return stack.isEmpty() ? "yes" : "no";
    }

    static int nextInt(StringTokenizer token) {
        return Integer.parseInt(token.nextToken());
    }

    static long nextLong(StringTokenizer token) {
        return Long.parseLong(token.nextToken());
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        System.out.println(
                solution(br.readLine())
        );
    }
}
