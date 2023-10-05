const { assert, measurePerformance } = require('./../../Utils');

//Напишите функцию, которая принимает в себя две строки и определяет
//Есть ли биекционная связь между ними (Зависимость одного значения от другого)

//Прим1: bijectionPattern(“abba”, “dog cat cat dog”) => // true
//Прим2: bijectionPattern(“abba”, “dog cat cat fish”) => // false
//Прим3: bijectionPattern(“abba”, “dog dog dog dog”) => // false
//Прим4: bijectionPattern(“aaaa”, “dog dog dog cat) => // false

// Пробел только один
// limit: 26
// 2000

function bijectionPattern(str, word) {
    const words = word.split(' ');
    if (new Set(words).size !== new Set(str).size) return false;

    const map = new Map();

    for (let i = 0; i < str.length; i++) {
        if (map.has(str[i])) {
            if (map.get(str[i]) !== words[i]) return false;
        } else {
            map.set(str[i], words[i]);
        }
    }

    return true;
}

const solutions = [bijectionPattern];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(true, solution('abba', 'dog cat cat dog'));
        assert(false, solution('abba', 'dog cat cat fish'));
        assert(false, solution('abba', 'dog dog dog dog'));
        assert(false, solution('aaaa', 'dog dog dog cat'));
    });
});
