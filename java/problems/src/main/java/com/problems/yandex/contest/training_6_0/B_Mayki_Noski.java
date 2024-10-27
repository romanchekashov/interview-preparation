package com.problems.yandex.contest.training_6_0;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

import static java.lang.Math.max;
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
/// #### Пример 1
/// Ввод:
/// 6
/// 2
/// 7
/// 3
/// Вывод:
/// 3 4
///
/// #### Пример 2
/// Ввод:
/// 1
/// 1
/// 1
/// 1
/// Вывод:
/// 2 1
///
public class B_Mayki_Noski {

    static String solution(int A, int B, int C, int D) {
        if ((A == 0 && C == 0) || (B == 0 && D == 0)) {
            return String.format("%d %d", 1, 1);
        } else if (A == 0) {
            return String.format("%d %d", 1, (C < D ? min(C, D) : max(C, D)) + 1);
        } else if (B == 0) {
            return String.format("%d %d", 1, (C > D ? min(C, D) : max(C, D)) + 1);
        } else if (C == 0) {
            return String.format("%d %d", (A < B ? min(A, B) : max(B, A)) + 1, 1);
        } else if (D == 0) {
            return String.format("%d %d", (A > B ? min(A, B) : max(B, A)) + 1, 1);
        }

        int shirts = A + B;
        int socks = C + D;
        int minShirts = min(A, B) + 1;
        int minSocks = min(C, D) + 1;
        int maxShirts = max(A, B) + 1;
        int maxSocks = max(C, D) + 1;

        if (A > B) { // more blue shirts
            if (C > D) { // more blue socks: 5 3 4 2
//                return String.format("%d %d", minShirts, minSocks);
            } else if (C < D) { // more red socks: 5 3 2 4
                if (maxShirts < maxSocks) {
                    return String.format("%d %d", maxShirts, 1);
                }
                return String.format("%d %d", 1, maxSocks);
            } else { // equal socks: 5 3 3 3, 2 1 3 3
                return String.format("%d %d", 1, minSocks);
            }
        } else if (A < B) { // more red shirts
            if (C > D) { // more blue socks: 3 5 4 2
                if (maxShirts < maxSocks) {
                    return String.format("%d %d", maxShirts, 1);
                }
                return String.format("%d %d", 1, maxSocks);
            } else if (C < D) { // more red socks: 3 5 2 4
//                return String.format("%d %d", maxShirts, minSocks);
            } else { // equal socks: 3 5 3 3
                return String.format("%d %d", 1, minSocks);
            }
        } else { // equal shirts
            if (C > D) { // more blue socks: 5 5 4 2
                return String.format("%d %d", minShirts, 1);
            } else if (C < D) { // more red socks: 5 5 2 4
                return String.format("%d %d", minShirts, 1);
            } else { // equal socks: 5 5 3 3
                return String.format("%d %d", A < C ? minShirts : minSocks, 1);
            }
        }

        if (A == B || shirts == minShirts) {
            return String.format("%d %d", minShirts, 1);
        } else if (C == D || socks == minSocks) {
            return String.format("%d %d", 1, minSocks);
        } else if (shirts < minSocks) {
            return String.format("%d %d", shirts, 1);
        } else if (socks < minShirts) {
            return String.format("%d %d", 1, socks);
        }

        if (maxShirts < maxSocks && maxShirts + 1 < minShirts + minSocks) {
            return String.format("%d %d", maxShirts, 1);
        } else if (maxSocks + 1 < minShirts + minSocks) {
            return String.format("%d %d", 1, maxSocks);
        }
        return String.format("%d %d", minShirts, minSocks);
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
/**
 * Существует две стратегии взять пару:
 *
 * 1. Взять один предмет и набрать других предметов столько, чтобы среди них 100% было оба цвета (взяв на один больше наибольшего количества);
 * 2. Гарантировать определенный цвет первого предмета и такой же цвет второго предмета (взяв все предметы противоположного цвета).
 *
 * Всё это помноженное на два цвета.
 *
 * Также есть краевые случаи, когда чего-то 0, или сразу двух предметов одного цвета 0.
 *
 * В принципе вот и вся задача, без параллельных вселенных, не усложняй)
 *
6
2
7
3
3 4

1
1
1
1
2 1

9
0
5
2
1 3

3
3
4
7
4 1

5
9
8
9
10 1

10
10
10
10
11 1

0
2
5
1
1 6

2
0
5
1
1 2

114
299
921
166
300 1

412
307
241
830
413 1

703
146
166
456
457 1
*/
