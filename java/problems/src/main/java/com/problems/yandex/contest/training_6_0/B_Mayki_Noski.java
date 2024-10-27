package com.problems.yandex.contest.training_6_0;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

import static java.lang.Math.min;

///
/// #### Тренировки по алгоритмам 6.0 от Яндекса — Занятие 1
/// ### B. Майки и носки
///
/// Как известно, осенью и зимой светает поздно и так хочется утром ещё хоть немного поспать, а не идти в школу! Некоторые школьники готовы даже одеваться, не открывая глаз, лишь бы отложить момент пробуждения. Вот и Саша решил, что майку и носки он вполне может вытащить из шкафа на ощупь с закрытыми глазами и только потом включить свет и одеться. В шкафу у Саши есть два ящика. В одном из них лежит
/// A
/// A синих и
/// B
/// B красных маек, в другом —
/// C
/// C синих и
/// D
/// D красных пар носков. Саша хочет, чтобы и майка, и носки были одного цвета. Он вслепую вытаскивает
/// M
/// M маек и
/// N
/// N пар носков. В первое же утро Саша задумался, какое минимальное суммарное количество предметов одежды (M+N) он должен вытащить, чтобы среди них гарантированно оказались майка и носки одного цвета. Какого именно цвета окажутся предметы одежды, для Саши совершенно неважно.
///
/// #### Формат ввода
/// На вход программе подаются четыре целых неотрицательных числа A, B, C, D, записанных в отдельных строках: A — количество синих маек, B — количество красных маек, C — количество синих носков, D — количество красных носков.
/// Все числа не превосходят 10^9. Гарантируется, что в шкафу есть одноцветный комплект из майки и носков.
///
/// #### Формат вывода
/// Программа должна вывести два числа: количество маек M и количество пар носков N, которые должен взять Саша. Необходимо, чтобы среди M маек и N пар носков обязательно нашлась одноцветная пара, при этом сумма M+N должна быть минимальной.
///
/// - Ограничение времени	1 секунда
/// - Ограничение памяти	256Mb
///
public class B_Mayki_Noski {

    static String solution(int A, int B, int C, int D) {
        return String.format("%d %d", min(A, B) + 1, min(C, D) + 1);
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
                solution(
                        nextInt(new StringTokenizer(br.readLine())),
                        nextInt(new StringTokenizer(br.readLine())),
                        nextInt(new StringTokenizer(br.readLine())),
                        nextInt(new StringTokenizer(br.readLine()))
                )
        );
    }
}
