package com.problems.yandex.contest.training_6_0.two;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

///
/// #### Тренировки по алгоритмам 6.0 от Яндекса — Занятие 2 (Префиксные суммы и два указателя)
/// ### B. Сумма номеров
///
/// Вася очень любит везде искать своё счастливое число
/// K
/// . Каждый день он ходит в школу по улице, вдоль которой припарковано
/// N
///  машин. Он заинтересовался вопросом, сколько существует наборов машин, стоящих подряд на местах с
/// L
///  до
/// R
/// , что сумма их номеров равна
/// K
/// . Помогите Васе узнать ответ на его вопрос.
/// Например, если число
/// N
/// =
/// 5
/// ,
/// K
/// =
/// 1
/// 7
/// , а номера машин равны 17, 7, 10, 7, 10, то существует 4 набора машин:
/// 17 (
/// L
/// =
/// 1
/// ,
/// R
/// =
/// 1
/// ),
/// 7, 10 (
/// L
/// =
/// 2
/// ,
/// R
/// =
/// 3
/// ),
/// 10, 7 (
/// L
/// =
/// 3
/// ,
/// R
/// =
/// 4
/// ),
/// 7, 10 (
/// L
/// =
/// 4
/// ,
/// R
/// =
/// 5
/// )
///
/// #### Формат ввода
/// В первой строке входных данных задаются числа
/// N
///  и
/// K
///  (
/// 1
/// ≤
/// N
/// ≤
/// 1
/// 0
/// 0
/// 0
/// 0
/// 0
/// ,
/// 1
/// ≤
/// K
/// ≤
/// 1
/// 0
/// 9
/// ).
/// Во второй строке содержится
/// N
///  чисел, задающих номера машин. Номера машин могут принимать значения от
/// 1
///  до
/// 9
/// 9
/// 9
///  включительно.
///
/// #### Формат вывода
/// Необходимо вывести одно число — количество наборов.
///
/// - Ограничение времени	1 секунда
/// - Ограничение памяти	64Mb
///
public class B_NumSum {

    static int nextInt(StringTokenizer token) {
        return Integer.parseInt(token.nextToken());
    }

    static long nextLong(StringTokenizer token) {
        return Long.parseLong(token.nextToken());
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer token = new StringTokenizer(br.readLine());
        int n = nextInt(token);
        int k = nextInt(token);

        token = new StringTokenizer(br.readLine());
        long nums = 0;
        Deque<Integer> q = new LinkedList<>();
        int sum = 0;
        for (int i = 0; i < n; i++) {
            q.add(nextInt(token));
            sum += q.getLast();

            while (sum > k) {
                sum -= q.removeFirst();
            }

            if (sum == k) {
                nums++;
                sum -= q.removeFirst();
            }
        }

        System.out.println(nums);
    }
}
