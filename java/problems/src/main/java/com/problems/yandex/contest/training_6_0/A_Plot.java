package com.problems.yandex.contest.training_6_0;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

import static java.lang.Math.abs;

///
/// #### Тренировки по алгоритмам 6.0 от Яндекса — Занятие 1
/// ### A. Плот
///
/// НиПосередине озера плавает плот, имеющий форму прямоугольника. Стороны плота направлены вдоль параллелей и меридианов. Введём систему координат, в которой ось OX направлена на восток, а ось ОY – на север. Пусть юго-западный угол плота имеет координаты (
/// x
/// 1
/// x
/// 1
/// ​
///  ,
/// y
/// 1
/// y
/// 1
/// ​
///  ), северо-восточный угол – координаты (
/// x
/// 2
/// x
/// 2
/// ​
///  ,
/// y
/// 2
/// y
/// 2
/// ​
///  ).
///
/// Пловец находится в точке с координатами (x, y). Определите, к какой стороне плота (северной, южной, западной или восточной) или к какому углу плота (северо-западному, северо-восточному, юго-западному, юго-восточному) пловцу нужно плыть, чтобы как можно скорее добраться до плота.
///
/// #### Формат ввода
/// Программа получает на вход шесть чисел в следующем порядке:
/// x
/// 1
/// x
/// 1
/// ​
///  ,
/// y
/// 1
/// y
/// 1
/// ​
///   (координаты юго-западного угла плота),
/// x
/// 2
/// x
/// 2
/// ​
///  ,
/// y
/// 2
/// y
/// 2
/// ​
///   (координаты северо-восточного угла плота),
/// x
/// x,
/// y
/// y (координаты пловца). Все числа целые и по модулю не превосходят 100. Гарантируется, что
/// x
/// 1
/// <
/// x
/// 2
/// x
/// 1
/// ​
///  <x
/// 2
/// ​
///  ,
/// y
/// 1
/// <
/// y
/// 2
/// y
/// 1
/// ​
///  <y
/// 2
/// ​
///  ,
/// x
/// ≠
/// x
/// 1
/// x
/// 
/// =x
/// 1
/// ​
///  ,
/// x
/// ≠
/// x
/// 2
/// x
/// 
/// =x
/// 2
/// ​
///  ,
/// y
/// ≠
/// y
/// 1
/// y
/// 
/// =y
/// 1
/// ​
///  ,
/// y
/// ≠
/// y
/// 2
/// y
/// 
/// =y
/// 2
/// ​
///  , координаты пловца находятся вне плота.
///
/// #### Формат вывода
/// Если пловцу следует плыть к северной стороне плота, программа должна вывести символ ”N”, к южной — символ ”S”, к западной — символ ”W”, к восточной — символ ”E”. Если пловцу следует плыть к углу плота, нужно вывести одну из следующих строк: ”NW”, ”NE”, ”SW”, ”SE”.
///
/// - Ограничение времени	1 секунда
/// - Ограничение памяти	256Mb
///
public class A_Plot {

    static String solution(int x1, int y1, int x2, int y2, int x, int y) {
        if (x >= x1 && x <= x2) { // N or S
            return abs(y - y2) < abs(y - y1) ? "N" : "S";
        } else if (y >= y1 && y <= y2) { // W or E
            return abs(x - x2) < abs(x - x1) ? "E" : "W";
        } else if (x < x1 && y > y2) { // NW
            return "NW";
        } else if (x < x1 && y < y1) { // SW
            return "SW";
        } else if (x > x2 && y > y2) { // NE
            return "NE";
        } else { // SE
            return "SE";
        }
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
                        nextInt(new StringTokenizer(br.readLine())),
                        nextInt(new StringTokenizer(br.readLine())),
                        nextInt(new StringTokenizer(br.readLine()))
                )
        );
    }
}
