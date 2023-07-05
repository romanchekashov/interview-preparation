package yandex.jobofferserbia;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

/**
 * Arithmetics Inc.
 * Компания Arithmetics Inc. разрабатывает программное обеспечение для работы с бесконечными арифметическими прогрессиями. Необходимо разработать структуру данных, которая будет хранить арифметические прогрессии и поддерживать следующие операции:
 *
 * Операция первого типа позволяет добавить новую арифметическую прогрессию в структуру.
 * Операция второго типа позволяет удалить заданную арифметическую прогрессию из структуры.
 * Операция третьего типа находит арифметическую прогрессию с минимальным первым элементом и возвращает найденный элемент, предварительно заменив стартовый элемент в прогрессии на следующий в ней. Если таких прогрессий несколько, то обрабатывается прогрессия, у которой минимальный идентификатор.
 * Формат ввода
 * На вход подается одно целое положительное число
 * �
 * q (
 * 1
 * ≤
 * �
 * ≤
 * 1
 * 0
 * 5
 * 1≤q≤10
 * 5
 *  ) — количество операций.
 *
 * Далее на вход подаются
 * �
 * q строк в следующем формате:
 *
 * Если это операция первого типа, то на вход подаются четыре числа
 * 1
 * 1,
 * �
 * 1
 * a
 * 1
 * ​
 *  ,
 * �
 * d,
 * �
 * �
 * id (
 * 0
 * ≤
 * ∣
 * �
 * 1
 * ∣
 * ,
 * ∣
 * �
 * ∣
 * ≤
 * 1
 * 0
 * 9
 * 0≤∣a
 * 1
 * ​
 *  ∣,∣d∣≤10
 * 9
 *  ,
 * 1
 * ≤
 * �
 * �
 * ≤
 * 1
 * 0
 * 9
 * 1≤id≤10
 * 9
 *  ) — первый элемент и разность добавляемой прогрессии, а также ее идентификатор.
 *
 * Если это операция второго типа, то на вход подаются два числа
 * 2
 * 2,
 * �
 * �
 * id — идентификатор прогрессии, которую необходимо удалить.
 *
 * Если это операция третьего типа, то на вход подается одно число
 * 3
 * 3. В этот момент хотя бы одна прогрессия будет находиться в структуре.
 *
 * Гарантируется, что все
 * �
 * �
 * id арифметических прогрессий различны. Удаляемая прогрессия, гарантированно находится в структуре данных.
 *
 * Формат вывода
 * Выведите ответы на каждый запрос третьего типа по одному в строке.
 *
 * Пример
 * Ввод
 * 15
 * 1 3 -4 1
 * 1 -5 4 3
 * 1 -2 10 2
 * 3
 * 3
 * 2 3
 * 3
 * 3
 * 2 2
 * 1 -5 4 4
 * 3
 * 2 1
 * 3
 * 3
 * 3
 * Вывод
 * -5
 * -2
 * 3
 * -1
 * -5
 * -5
 * -1
 * 3
 * Ограничение памяти
 * 256.0 Мб
 * Ограничение времени
 * 2 с
 * Ввод
 * стандартный ввод или input.txt
 * Вывод
 * стандартный вывод или output.txt
 */
public class B {
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
