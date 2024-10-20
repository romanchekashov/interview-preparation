const { inputData, outputData, readline, print } = require('../lib/codeforces-tester');

// test input/output data
inputData(`
5
3
1 2 5
3
1 2 3
4
0 1 2 3
4
1 2 2 3
1
1

`)

outputData(`
6
0
0
-1
1

`)

// execute script: node ./solution.js
// solution to copy and send below (for JS IMPORTANT to add at start of script: "use strict";)
"use strict";

var A = function (string) {
    const arr = string.split(' ').map(num => +num)
    let x = 0

    for (const num of arr) {
        x ^= num
    }

    let sum = 0

    for (const num of arr) {
        sum ^= num ^ x
    }

    return sum === 0 ? x : -1
};

(function() {
    const t = readline(); // first line of input usually gives the no. of test cases,i.e, the no. of lines ahead.

    for(let i = 0; i < t; i++) {
        readline(); // array length
        print(A(readline()));
    }
})()

/**
 * https://codeforces.com/contest/1805/problem/A
 *
 * Подсказки:
 * Вспомните основные свойства операции ⊕: 𝐴⊕0=𝐴, 𝐴⊕𝐴=0, 𝐴⊕𝐵=𝐵⊕𝐴.
 * Рассмотрите случаи чётной и нечётной длины массива.
 *
 * Разбор:
 * 1805A - Нам нужен ноль
 * Заметим, что (𝑎1⊕𝑥)⊕(𝑎2⊕𝑥)⊕... равняется 𝑎1⊕𝑎2⊕…⊕𝑎𝑛 если 𝑛 чётно, либо 𝑎1⊕𝑎2⊕…⊕𝑎𝑛⊕𝑥 если 𝑛 нечётно.
 * Тогда в случае нечётной длины массива нужно вывести ⊕ всего массива.
 * А если же длина чётна, то мы не можем изменить значение выражения нашей операцией.
 * Получается, если ⊕ всего массива равен 0, то можно вывести любое число, а иначе ответа нет.
 *
 * Решение:
 * for _ in range(int(input())):
 *     n = int(input())
 *     a = list(map(int, input().split()))
 *     xor = 0
 *     for x in a:
 *         xor ^= x
 *     if xor == 0:
 *         print(0)
 *     else:
 *         if n % 2 == 1:
 *             print(xor)
 *         else:
 *             print(-1)
 */
