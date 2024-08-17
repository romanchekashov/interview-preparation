package com.problems.yandex.jobofferserbia;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

/**
 * Игра на дереве
 * Есть дерево из
 * �
 * n вершин, корнем которого является вершина
 * 1
 * 1. Два игрока играют в следующую игру. На корне дерева стоит фишка. Игроки ходят по очереди, и на своём ходу игрок должен передвинуть фишку на одного из потомков текущей вершины. Каждый лист дерева является выигрышным, проигрышным или нейтральным. Если фишка находится на листе, тот игрок, который её только что туда передвинул, заканчивает игру с результатом, который указан на этом листе.
 *
 * Если фишка находится на расстоянии
 * �
 * k от корня и не на листе, игрок может сказать «реверс» перед тем, как её двигать, — тогда все результаты на листьях изменятся на противоположные. Обратите внимание, что «реверс» может быть сказан не более одного раза за игру.
 *
 * Как закончится игра, если оба игрока действуют оптимально?
 *
 * Формат ввода
 * В первой строке записаны два числа
 * �
 * n и
 * �
 * k (
 * 2
 * ≤
 * �
 * ≤
 * 5000
 * ,
 * 0
 * ≤
 * �
 * <
 * �
 * 2≤n≤5000,0≤k<n) количество вершин и глубина, на которой можно сделать реверс.
 *
 * Далее записана строка из
 * �
 * n символов.
 * �
 * i-й символ этой строки равен «+», если
 * �
 * i-я вершина является листом и выигрышная, «-», если
 * �
 * i-я вершина является листом и проигрышная, «0», если
 * �
 * i-я вершина является листом и нейтральная, и «.» в противном случае (вершина не является листом).
 *
 * Далее записаны
 * �
 * −
 * 1
 * n−1 строк, в каждой по два числа
 * �
 * �
 * u
 * i
 * ​
 *  ,
 * �
 * �
 * v
 * i
 * ​
 *   (
 * 1
 * ≤
 * �
 * �
 * ,
 * �
 * �
 * ≤
 * �
 * 1≤u
 * i
 * ​
 *  ,v
 * i
 * ​
 *  ≤n) ребра дерева.
 *
 * Формат вывода
 * Выведите First, Second или Draw, в зависимости от того, кто выиграет.
 *
 * Пример 1
 * Ввод
 * 8 1
 * ..-0..-+
 * 1 2
 * 2 3
 * 2 4
 * 1 5
 * 5 6
 * 6 7
 * 6 8
 * Вывод
 * First
 * Пример 2
 * Ввод
 * 8 1
 * ..-0..0+
 * 1 2
 * 2 3
 * 2 4
 * 1 5
 * 5 6
 * 6 7
 * 6 8
 * Вывод
 * Draw
 * Ограничение памяти
 * 256.0 Мб
 * Ограничение времени
 * 2 с
 * Ввод
 * стандартный ввод или input.txt
 * Вывод
 * стандартный вывод или output.txt
 */
public class D {
    static String solution(long n, long k) {
        // 2 * x + k * y = n
        // x + (k / 2) * y = n / 2
        return (n % 2 == 0 || (n >= k && (k % 2 == 1))) ? "YES" : "NO";
    }

    static String solution2(long n, long k) {
        // 2 * x + k * y = n
        // (2 / n) * x + (k / n) * y = 1
        // (2 / n) * x = 1 || (k / n) * y = 1
        // x = n / 2 || y = n / k
        // 2 * x + 3 * y = 7 - wrong NO
        // (2 / 7) * x + (3 / 7) * y = 1
        if (2 + k == n) return "YES";
        return (n % 2 == 0 || n % k == 0) ? "YES" : "NO";
    }

    static String solution3(long n, long k) {
        // 2 * x + k * y = n
        // x = (n - k * y) / 2
        long y = 0;
        // (7 - 3 * y) / 2
        while (k * y <= n) {
            if ((n - k * y) % 2 == 0) return "YES";
            y++;
        }

        return "NO";
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
            long n = nextLong(token);
            long k = nextLong(token);

            System.out.println(solution3(n, k));
        }
    }
}
