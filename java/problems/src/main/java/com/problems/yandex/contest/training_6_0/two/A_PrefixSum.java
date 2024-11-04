package com.problems.yandex.contest.training_6_0.two;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

///
/// #### Тренировки по алгоритмам 6.0 от Яндекса — Занятие 2 (Префиксные суммы и два указателя)
/// ### A. Префиксные суммы
///
/// По данной последовательности
/// a
/// 1
/// ,
/// a
/// 2
/// ,
/// …
/// ,
/// a
/// n
/// a
/// 1
/// ​
///  ,a
/// 2
/// ​
///  ,…,a
/// n
/// ​
///   вычислите последовательность ее префиксных сумм
/// b
/// 1
/// ,
/// b
/// 2
/// ,
/// …
/// ,
/// b
/// n
/// b
/// 1
/// ​
///  ,b
/// 2
/// ​
///  ,…,b
/// n
/// ​
///  , где
/// b
/// j
/// =
/// ∑
/// j
/// i
/// =
/// 1
/// a
/// i
/// b
/// j
/// ​
///  =
/// i=1
/// ∑
/// j
/// ​
///  a
/// i
/// ​
///  .
///
/// Формат ввода
/// В первой строке дано целое число
/// n
/// n (
/// 1
/// ≤
/// n
/// ≤
/// 1
/// 0
/// 3
/// 1≤n≤10
/// 3
///  )  — количество элементов в последовательности
/// a
/// a. Во второй строке дано
/// n
/// n целых чисел
/// a
/// 1
/// ,
/// a
/// 2
/// ,
/// …
/// ,
/// a
/// n
/// a
/// 1
/// ​
///  ,a
/// 2
/// ​
///  ,…,a
/// n
/// ​
///   (
/// ∣
/// a
/// i
/// ∣
/// ≤
/// 1
/// 0
/// 6
/// ∣a
/// i
/// ​
///  ∣≤10
/// 6
///  )  — элементы последовательности.
///
/// Формат вывода
/// Выведите
/// n
/// n целых чисел
/// b
/// 1
/// ,
/// b
/// 2
/// ,
/// …
/// ,
/// b
/// n
/// b
/// 1
/// ​
///  ,b
/// 2
/// ​
///  ,…,b
/// n
/// ​
///    — последовательность префиксных сумм для последовательности
/// a
/// a.
///
/// - Ограничение времени	1 секунда
/// - Ограничение памяти	256Mb
///
public class A_PrefixSum {

    static int nextInt(StringTokenizer token) {
        return Integer.parseInt(token.nextToken());
    }

    static long nextLong(StringTokenizer token) {
        return Long.parseLong(token.nextToken());
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(new StringTokenizer(br.readLine()).nextToken());
        int[] list = new int[t];
        long sum = 0;
        StringTokenizer token = new StringTokenizer(br.readLine());
        for (int i = 0; i < list.length; i++) {
            sum += nextInt(token);
            System.out.print(sum + " ");
        }

        System.out.println();
    }
}
