package com.problems.yandex.contest.training_6_0;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

///
/// #### Тренировки по алгоритмам 6.0 от Яндекса — Занятие 1
/// ### E. Наибольшее произведение двух чисел (составление тестов)
///
/// На соревновании участникам была предложена следующая задача:
///
/// ——
///
/// Дан список, заполненный произвольными целыми числами. Найдите в этом списке два числа, произведение которых максимально. Выведите эти числа в порядке неубывания.
///
/// Список содержит не менее двух элементов. Числа подобраны так, что ответ однозначен.
///
/// Решение должно иметь сложность O(n), где n - размер списка.
///
/// ——
///
/// Вам предстоит разработать набор тестов (только входных данных) для этой задачи, тщательно проверяющий решения участников.
///
/// #### Формат вывода
/// Сдавать следует не программу, а текстовый файл.
///
/// В первой строке файла запишите число
/// N
/// N (
/// 1
/// ≤
/// N
/// ≤
/// 20
/// 1≤N≤20) — количество тестов, которые вы разработали.
///
/// В следующих
/// N
/// N строках запишите по одному тесту. Каждый тест должен состоять из одной строки, в которой записано число
/// K
/// K (
/// 2
/// ≤
/// K
/// ≤
/// 10
/// 2≤K≤10) — количество чисел в последовательности, а затем
/// K
/// K чисел
/// a
/// i
/// a
/// i
/// ​
///   (
/// −
/// 100
/// ≤
/// a
/// i
/// ≤
/// 100
/// −100≤a
/// i
/// ​
///  ≤100).
///
/// #### Примечания
/// Пример формата файла для сдачи:
///
/// 2
///
/// 3 1 2 3
///
/// 5 -1 1 0 -2 3
///
public class E_MaxProductOf2Numbers {

    static String solution(int[] list) {
        System.out.println(Arrays.toString(list));
        return "0 0";
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
            int k = nextInt(token);
            int[] list = new int[k];
            int i = 0;
            while (k-- > 0) {
                list[i++] = nextInt(token);
            }
            System.out.println(solution(list));
        }
    }
}

/**
 * ребят, в задаче Е провела исследование и им достаточно 5 кейсов (может можно и меньше, у меня получилось в 5 уложиться)
 * главное чтобы были варианты с 2мя числами и 10ю, а так же были одинаковые числа, которые дают максимум, были 100,-100
 * и чтобы были числа на краях последовательностей и в середине.
 *
 * Answer below:
9
2 100 -100
3 -100 100 -100
4 -100 100 100 -99
5 -100 -50 0 60 100
6 99 99 -100 -100 88 88
7 1 4 -77 9 -7 -77 11
8 2 84 -34 40 17 64 -96 -72
9 -100 99 99 99 99 99 99 99 -100
10 10 9 8 7 6 5 4 3 2 1
*/
