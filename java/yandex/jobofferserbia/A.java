package yandex.jobofferserbia;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

/**
 * Бонусы для водителей
 * Водители Яндекс.Такси узнали о раздаче бонусов и выстроились перед офисом. У каждого водителя есть рейтинг. Необходимо раздать водителям бонусы, соблюдая следующие условия:
 *
 * • Сумма бонуса кратна 500 рублям.
 *
 * • Каждый водитель должен получить как минимум 500 рублей.
 *
 * • Водитель с бóльшим рейтингом должен получить бóльшую сумму бонуса, чем его соседи слева или справа с меньшим рейтингом.
 *
 * Какое минимальное количество денег потребуется на бонусы?
 *
 * Формат ввода
 * На первой строчке записано число N (
 * 1
 * ≤
 * �
 * ≤
 * 20000
 * 1≤N≤20000), далее следует N строчек с рейтингами водителей Rn (
 * 0
 * ≤
 * �
 * �
 * <
 * 4096
 * 0≤Rn<4096)
 *
 * Формат вывода
 * Ответ должен содержать минимально необходимое количество денег для выплаты вознаграждений
 *
 * Пример 1
 * Ввод
 * 4
 * 1
 * 2
 * 3
 * 4
 * Вывод
 * 5000
 * Пример 2
 * Ввод
 * 4
 * 5
 * 5
 * 5
 * 5
 * Вывод
 * 2000
 * Пример 3
 * Ввод
 * 4
 * 4
 * 2
 * 3
 * 3
 * Вывод
 * 3000
 * Примечание
 * Водители в очереди стоят строго друг за другом, циклов в ней нет
 *
 * Ограничение памяти
 * 64.0 Мб
 * Ограничение времени
 * 1 с
 * Ввод
 * стандартный ввод или input.txt
 * Вывод
 * стандартный вывод или output.txt
 */
public class A {

    static long solution(int[] ratings) {
        int minBonus = 500, len = ratings.length;
        if (len == 1) return minBonus;

        int[] bonuses = new int[len];
        Arrays.fill(bonuses, 0);
        long res = 0;
        int stackCounter = 0;

        for (int i = 0; i < len; i++) {
            boolean curLessOrEqualToPrev = (i == 0 || ratings[i] <= ratings[i - 1]);
            boolean curLessOrEqualToNext = (i + 1 == len || (i + 1 < len && ratings[i] <= ratings[i + 1]));

            if (curLessOrEqualToPrev && curLessOrEqualToNext) {
                res += minBonus;
                bonuses[i] = minBonus;
//                System.out.println(minBonus);
                if (stackCounter > 0) {
                    int j = i - 1;
                    int tempBonus = minBonus;
                    while (stackCounter > 0) {
                        tempBonus += minBonus;
                        res += tempBonus;
                        stackCounter--;
                        bonuses[j--] = tempBonus;
//                        System.out.println(tempBonus);
                    }
//                    System.out.println();
                }
            } else {
                stackCounter++;
            }
        }

        if (stackCounter > 0) {
            int j = len - 1;
            int tempBonus = minBonus;
            while (stackCounter > 0) {
                tempBonus += minBonus;
                res += tempBonus;
                stackCounter--;
                bonuses[j--] = tempBonus;
//                System.out.println(tempBonus);
            }
//            System.out.println();
        }

//        System.out.println(Arrays.toString(bonuses));
        for (int i = 1; i < len - 1; i++) {
            if (ratings[i] < ratings[i - 1] || ratings[i] < ratings[i + 1]) {
                int maxBonus = Math.max(bonuses[i - 1], bonuses[i + 1]);
                if (bonuses[i] > maxBonus) bonuses[i] = maxBonus;
            }
        }
//        System.out.println(Arrays.toString(bonuses));
//        System.out.println(Arrays.stream(bonuses).sum());

//        return res;
        return Math.min(res, Arrays.stream(bonuses).sum());
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

        int[] ratings = new int[t];
        int i = 0;
        while (t-- > 0) {
            StringTokenizer token = new StringTokenizer(br.readLine());
            ratings[i++] = nextInt(token);
        }

        System.out.println(solution(ratings));
    }
}
