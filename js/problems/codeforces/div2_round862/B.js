const { inputData, outputData, readline, print } = require('../lib/codeforces-tester');

// test input/output data
inputData(`
4
3
cba
4
acac
5
abbcb
4
aaba

`)

outputData(`
acb
aacc
abbcb
aaab

`)

// execute script: node ./solution.js
// solution to copy and send below (for JS IMPORTANT to add at start of script: "use strict";)
"use strict";

var B = function (string) {
    let char = string[0]
    let pos = 0

    for (let i = 1; i < string.length; i++) {
        if (string[i] <= char) {
            char = string[i]
            pos = i
        }
    }

    if (pos === 0) return string

    return string[pos] + string.substring(0, pos) + string.substring(pos + 1)
};

(function() {
    const t = readline(); // first line of input usually gives the no. of test cases,i.e, the no. of lines ahead.

    for(let i = 0; i < t; i++) {
        readline(); // string length
        print(B(readline()));
    }
})()

/**
 * https://codeforces.com/contest/1805/problem/B
 *
 * Подсказки:
 * Какой должен быть первый символ, если мы пытаемся сделать строку лексикографически минимальной?
 * Рассмотрим строку «baba». Если выбрать 𝑖=2, то получится строка «abba», а если выбрать 𝑖=4, то получится «abab». Попробуйте обобщить эти рассуждения на любую строку.
 *
 * Разбор:
 * 1805B - У строки есть цель
 * Во первых, заметим что операцию нужно применять только к позиции,
 * на которой стоит минимальный элемент строки (так как на 1 позиции в итоговой строке всегда должна стоять минимальная буква).
 *
 * Далее, пусть позиции вхождений минимальной буквы - 𝑎1,𝑎2,…,𝑎𝑘. Тогда нужно применять операцию к последней позиции (𝑎𝑘).
 * Действительно, пусть мы применили операцию к другому вхождению: тогда префиксы будут совпадать,
 * а после будет символ, который равен минимальному если мы применили операцию к 𝑎𝑘 и не будет ему равен иначе, что противоречит минимальности строки.
 *
 * Решение:
 * for _ in range(int(input())):
 *     n = int(input())
 *     s = input()
 *     ind = s.rfind(min(s))  # Find the last ind such that s[ind] = min(s)
 *     print(s[ind] + s[:ind] + s[ind + 1:])
 *
 */
