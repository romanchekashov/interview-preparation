"use strict";
const { inputData, outputData, readline, print } = require('../lib/codeforces-tester');

inputData(`
5
1 2
1
1 -1 2
1 -1 3
2 2
1
4
1 2 1
2 5 1
1 1
0
1 0 0
1 1
100000000
100000000 100000000 100000000
2 3
0
2
2 2 1
1 -2 1
1 -2 -1

`)

outputData(`
YES
1
YES
1

YES
1
YES
4

NO

YES
100000000

YES
2
NO
NO

`)

// solution to copy and send below (for JS important to add: "use strict";)
"use strict";

var findClosestGreaterOrEqual = (sorted_arr, val) => {
    let left = 0, right = sorted_arr.length - 1

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (val > sorted_arr[mid]) {
            left = mid + 1
        } else if (val < sorted_arr[mid]) {
            right = mid - 1
        } else {
            return [val]
        }
    }

    const searchResult = []
    if (sorted_arr[left] !== undefined) {
        searchResult.push(sorted_arr[left])
    }
    if (sorted_arr[right] !== undefined) {
        searchResult.push(sorted_arr[right])
    }

    return searchResult
}

var canIntersect = function (k, a, b, c) {
    let _b = b - k

    let discriminant = _b * _b - 4 * a * c;

    if (discriminant < 0) return ['YES', k]

    return ['NO']
};

var C = function (kArr, abcArr) {
    const res = []
    kArr.sort((a, b) => a - b)

    for (const abc of abcArr) {
        let result;
        // instead of searching through all line just search line k which close to b (discriminant might be less than 0 if k will be close to b)
        // https://codeforces.com/blog/entry/114644
        const closestKtoBarr = findClosestGreaterOrEqual(kArr, abc[1])
        for (const k of closestKtoBarr) {
            result = canIntersect(k, abc[0], abc[1], abc[2])
            if (result.length > 1) {
                break
            }
        }

        if (result) {
            res.push(result)
        } else {
            res.push(['NO'])
        }
    }

    return res
};

(function() {
    const t = readline(); // first line of input usually gives the no. of test cases,i.e, the no. of lines ahead.

    for(let i = 0; i < t; i++) {
        const n_m = readline().split(' '); // string length

        let n = +n_m[0]
        let m = +n_m[1]

        const kArr = []

        while (n-- > 0) {
            kArr.push(+readline())
        }

        const abcArr = []

        while (m-- > 0) {
            abcArr.push(readline().split(' ').map(num => +num))
        }

        const res = C(kArr, abcArr)
        for (const a of res) {
            for (const b of a) {

                print(b);
            }
        }
    }
})()


/**
 * https://codeforces.com/contest/1805/problem/C
 *
 * Подсказки:
 * Заметим, что расстояние между прямой и параболой тоже будет параболой. Тогда какое условие на то, что прямая и парабола не имеют общих точек?
 * Вспомним формулу дискриминанта из школы: Если дана парабола 𝑎𝑥2+𝑏𝑥+𝑐, то вычислим 𝐷=𝑏2−4𝑎𝑐 (дискриминант). Тогда, если 𝐷>0, то у параболы 2 корня, если 𝐷=0, то один корень, если 𝐷<0, то корней нет.
 * Если мы выберем параболу 𝑎𝑥2+𝑏𝑥+𝑐, то не имеют с ней общих точек прямые с таким коэффициентом 𝑘, что (𝑏−𝑘)2<4𝑎𝑐. Как найти такое 𝑘 среди данных?
 *
 * Разбор:
 * 1805C - Места для селфи
 * Будем обрабатывать параболы по одной. Пусть нам дана парабола 𝑎𝑥2+𝑏𝑥+𝑐 и прямая 𝑘𝑥. Тогда их разность будет параболой 𝑎𝑥2+(𝑏−𝑘)𝑥+𝑐.
 * Чтобы прямая и парабола не пересекались нужно, чтобы разность никогда не равнялась 0, то есть у параболы 𝑎𝑥2+(𝑏−𝑘)𝑥+𝑐 не должно быть корней.
 * А это верно только в случае, когда дискриминант меньше 0, то есть (𝑏−𝑘)2<4𝑎𝑐. При этом 𝑎,𝑏 и 𝑐 нам даны, а нам нужно выбрать 𝑘. (𝑏−𝑘)2<4𝑎𝑐⟹|𝑏−𝑘|<4𝑎𝑐‾‾‾‾√⟹𝑏−4𝑎𝑐‾‾‾‾√<𝑘<𝑏+4𝑎𝑐‾‾‾‾√.
 *
 * Пусть теперь у нас есть список коэффициентов прямых, отсортированных по возрастанию.
 * Нам нужно проверить, есть ли в нём число, принадлежащее отрезку [𝑏−4𝑎𝑐‾‾‾‾√;𝑏+4𝑎𝑐‾‾‾‾√].
 * Для этого проверим наименьшее число больше 𝑏, а также наибольшее число меньше 𝑏.
 * Если одно из этих чисел удовлетворяет условию, то мы нашли ответ.
 * Если же нет, то среди коэффициентов точно нет подходящих, так как мы взяли 2 ближайших к центру отрезка.
 *
 * Заметим, что в этом условии нам не нужно пользоваться нецелыми числами, что хорошо влияет и на время работы, и на отсутствие ошибок из-за погрешностей.
 *
 * Решение:
 * #include <bits/stdc++.h>
 * #define int long long
 *
 * using namespace std;
 *
 *
 * void solve() {
 *     int n, m;
 *     cin >> n >> m;
 *     vector <int> lines(n);
 *     for (int i = 0; i < n; i++) {
 *         cin >> lines[i];
 *     }
 *     sort(lines.begin(), lines.end());
 *
 *     for (int i = 0; i < m; i++) {
 *         int a, b, c;
 *         cin >> a >> b >> c;
 *
 *         int ind = lower_bound(lines.begin(), lines.end(), b) - lines.begin();
 *         if (ind < n && (lines[ind] - b) * (lines[ind] - b) < 4 * a * c) {
 *             cout << "YES\n" << lines[ind] << "\n";
 *             continue;
 *         }
 *         if (ind > 0 && (lines[ind - 1] - b) * (lines[ind - 1] - b) < 4 * a * c) {
 *             cout << "YES\n" << lines[ind - 1] << "\n";
 *             continue;
 *         }
 *         cout << "NO\n";
 *     }
 * }
 *
 *
 * signed main() {
 *     ios::sync_with_stdio(false);
 *     cin.tie(nullptr);
 *
 *     int q = 1;
 *     cin >> q;
 *     while (q--) {
 *         solve();
 *     }
 *     return 0;
 * }
 *
 */
