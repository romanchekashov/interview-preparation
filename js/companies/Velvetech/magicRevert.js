const { assert, measurePerformance } = require('./../../Utils');

/**
 * Дана некоторая строка 'str'. Необходимо написать функцию,
 * которая "развернёт строку" (1ы-й символ станет последним, второй предпоследним и т.д.),
 * нечетные символы сделает заглавными, а чётные строчными.
 *
 * Например:
 *
 * input str = "Hello"
 * output str = "OlLeH"
 *
 * input str = "worlD"
 * output str = "DlRoW"
 */

// O(2*n) - time complexity, O(n) - space complexity(array creation)
function magicRevert(str) {
    return str.split('').reduceRight((result, value, i) => {
        i % 2
            ? (result += value.toLowerCase())
            : (result += value.toUpperCase());
        return result;
    }, '');
}

// O(n) - time complexity, O(1) - space complexity
function magicRevert2(str) {
    let result = '';

    for (let i = str.length - 1; i >= 0; i--) {
        result += i % 2 ? str[i].toLowerCase() : str[i].toUpperCase();
    }

    return result;
}

const solutions = [magicRevert, magicRevert2];

const tests = [
    {
        in: 'Hello',
        expect: 'OlLeH',
    },
    {
        in: 'worlD',
        expect: 'DlRoW',
    },
];

solutions.forEach((solution) => {
    console.log();
    console.log(`Run tests for: ${solution.name}`);

    let repeates = 100;
    console.log('repeates: ', repeates);
    measurePerformance(() => {
        for (let i = 0; i < repeates; i++)
            tests.forEach((test) => assert(test.expect, solution(test.in)));
    });

    repeates = 1000;
    console.log('repeates: ', repeates);
    measurePerformance(() => {
        for (let i = 0; i < repeates; i++)
            tests.forEach((test) => assert(test.expect, solution(test.in)));
    });

    repeates = 10000;
    console.log('repeates: ', repeates);
    measurePerformance(() => {
        for (let i = 0; i < repeates; i++)
            tests.forEach((test) => assert(test.expect, solution(test.in)));
    });

    repeates = 1000000;
    console.log('repeates: ', repeates);
    measurePerformance(() => {
        for (let i = 0; i < repeates; i++)
            tests.forEach((test) => assert(test.expect, solution(test.in)));
    });

    repeates = 10000000;
    console.log('repeates: ', repeates);
    measurePerformance(() => {
        for (let i = 0; i < repeates; i++)
            tests.forEach((test) => assert(test.expect, solution(test.in)));
    });
});
