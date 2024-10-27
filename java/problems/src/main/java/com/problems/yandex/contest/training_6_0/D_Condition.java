package com.problems.yandex.contest.training_6_0;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

import static java.lang.Math.*;

///
/// #### Тренировки по алгоритмам 6.0 от Яндекса — Занятие 1
/// ### D. Кондиционер (составление тестов)
///
/// На соревновании участникам была предложена следующая задача:
///
/// ——
///
/// В офисе, где работает программист Петр, установили кондиционер нового типа. Этот кондиционер отличается особой простотой в управлении. У кондиционера есть всего лишь два управляемых параметра: желаемая температура и режим работы.
///
/// Кондиционер может работать в следующих четырех режимах:
///
/// «freeze» — охлаждение. В этом режиме кондиционер может только уменьшать температуру. Если температура в комнате и так не больше желаемой, то он выключается.
///
/// «heat» — нагрев. В этом режиме кондиционер может только увеличивать температуру. Если температура в комнате и так не меньше желаемой, то он выключается.
///
/// «auto» — автоматический режим. В этом режиме кондиционер может как увеличивать, так и уменьшать температуру в комнате до желаемой.
///
/// «fan» — вентиляция. В этом режиме кондиционер осуществляет только вентиляцию воздуха и не изменяет температуру в комнате.
///
/// Кондиционер достаточно мощный, поэтому при настройке на правильный режим работы он за час доводит температуру в комнате до желаемой.
///
/// Требуется написать программу, которая по заданной температуре в комнате troom, установленным на кондиционере желаемой температуре tcond и режиму работы определяет температуру, которая установится в комнате через час.
///
/// ——
///
/// Вам предстоит разработать набор тестов (только входных данных) для этой задачи, тщательно проверяющий решения участников.
///
/// #### Формат вывода
/// Сдавать следует не программу, а текстовый файл.
///
/// В первой строке файла запишите число N (1 ≤ N ≤ 20) — количество тестов, которые вы разработали.
///
/// В следующих N строках запишите по одному тесту. Каждый тест должен состоять из чисел troom и tcond (-50 ≤t_room,t_cond≤ 50) и режима работы кондиционера (одно из слов freeze, heat, auto, fan).
///
/// Примечания
/// Пример формата файла для сдачи:
///
/// 3
///
/// 10 20 heat
///
/// 20 25 freeze
///
/// 20 20 fan
///
public class D_Condition {

    enum Mode {
        freeze, heat, auto, fan
    }

    static int solution(int tRoom, int tCondition, Mode mode) {
        System.out.println("tRoom = " + tRoom + ", tCondition = " + tCondition + ", mode = " + mode);
        switch (mode) {
            case freeze:
                return min(tRoom, tCondition);
            case heat:
                return max(tRoom, tCondition);
            case auto:
                return tCondition;
            case fan:
                return tRoom;
        }
        return 0;
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
            int tRoom = nextInt(token);
            int tCondition = nextInt(token);
            Mode mode = Mode.valueOf(token.nextToken());
            System.out.println(solution(tRoom, tCondition, mode));
        }
    }
}

/**
 * Сначала пытался что то там придумать сложно. Решение не проходило
 * Потом взял просто 5 случаев самых простых (нужно просто было составить все возможные варианты перехода температуры) и это размножил на все 4 режима.
 *
 * Когда увидел  "OK" - первая фраза вслух "Чегоо!! так просто"
 * Answer below:
20
50 50 freeze
-50 0 freeze
0 -50 freeze
0 50 freeze
50 0 freeze
50 50 heat
-50 0 heat
0 -50 heat
0 50 heat
50 0 heat
50 50 auto
-50 0 auto
0 -50 auto
0 50 auto
50 0 auto
50 50 fan
-50 0 fan
0 -50 fan
0 50 fan
50 0 fan
*/
