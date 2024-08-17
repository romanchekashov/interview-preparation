package com.problems.yandex.jobofferserbia;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

/**
 * Канонический запрос
 * Программисту Василию нужно проанализировать, какие запросы больше всего нагружают SQL-сервер. Так как запросов в логе очень много, Василий хочет привести все SQL-запросы к канонической форме, чтобы можно было группировать запросы, отличающиеся только значениями параметров вызова.
 *
 * Каноническая форма запроса определяется следующими правилами:
 *
 * Весь запрос должен состоять из одной строки в нижнем регистре.
 *
 * Все идущие подряд пробельные символы (whitespaces) должны быть схлопнуты в один пробел ’ ’ (без кавычек), при этом, после открывающей круглой скобки ’(’ (без кавычек) и перед закрывающей круглой скобкой ’)’ (без кавычек) не должно быть даже одиночных пробелов. Так же должны быть удалены все пробельные символы в конце запроса.
 *
 * Все значения параметров запроса должны быть заменены на символ знака вопроса ’?’ (без кавычек)
 *
 * Всё, что находится внутри скобок секции in (param1, param2 ... paramN) должно быть заменено на три точки ’...’ без кавычек.
 *
 * Например, для запроса
 *
 * SELECT
 *   id, name
 * FROM users
 * WHERE
 *   family = "Petrov" and
 *   (
 *     group_id = "1" or manager_id in ( "1", "3", "8" , "92" )
 *   );
 * Канонической формой будет
 *
 * select id, name from users where family = ? and (group_id = ? or manager_id in (...));
 *
 * Пока Василий занят настройкой аналитики в ClickHouse, он просит вас написать функцию, возвращающую каноническую форму запроса.
 *
 * Формат ввода
 * На вход поступают
 * �
 * n строк,
 * 1
 * ≤
 * �
 * ≤
 * 1000
 * 1≤n≤1000, содержащие тело запроса. В строках могут присутствовать символы с ASCII-кодами 32-127, а так же символ табуляции. Тело запроса обязательно содержит хотя бы один значимый (непробельный) символ. Суммарная длина всех строк не превосходит
 * 200000
 * 200000 символов. Все параметры запроса заданы в двойных кавычках "
 *
 * Формат вывода
 * Выведите единственную строку с канонической формой запроса
 *
 * Пример 1
 * Ввод
 * select id from tasks
 * where query_part
 * in ( ";" , " in ( ?, ? )",
 * "in" )
 * and task_owner = "Vasily";
 * Вывод
 * select id from tasks where query_part in (...) and task_owner = ?;
 * Пример 2
 * Ввод
 * select t.id
 * from topics t
 * inner join readers r
 * on r.t_id = t.id
 * where (
 * ifnull( t.ref, "n" ) = "a"
 * or t.name = "messages"
 * or t.name like "%'"
 * );
 * Вывод
 * select t.id from topics t inner join readers r on r.t_id = t.id where (ifnull(t.ref, ?) = ? or t.name = ? or t.name like ?);
 * Примечание
 * Гарантируется, что в двойные кавычки могут быть заключены только значения параметров запроса. Внутри значений параметров, заданных в двойных кавычках, не бывает экранированных двойных кавычек, а одинарные кавычки встречаются только в значениях параметров запроса (то есть только внутри двойных кавычек).
 *
 * Перед оператором in и сразу после него обязательно есть пробельные символы.
 *
 * Переводы строк в теле запроса учитываются как пробельные символы. Если вы считываете запрос построчно функциями, обрезающими символ перевода строки, не забудьте добавить их перед началом обработки.
 *
 * Ограничение памяти
 * 256.0 Мб
 * Ограничение времени
 * 1 с
 * Ввод
 * стандартный ввод или input.txt
 * Вывод
 * стандартный вывод или output.txt
 */
public class C {
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
