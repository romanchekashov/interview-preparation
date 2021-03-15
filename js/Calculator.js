const { assert, measurePerformance } = require('./Utils');

function getNumber(value) {
    if (!value) return 'Empty string';

    const calc = (value, splitterRegExp, map) => {
        const vals = value.split(splitterRegExp).map(map);
        let res = vals[0];
        if (vals.length > 1) {
            const operations = value.match(splitterRegExp);
            for (let i = 0; i < operations.length; i++) {
                if ('*' === operations[i]) res *= vals[i + 1];
                else if ('/' === operations[i]) res /= vals[i + 1];
                else if ('+' === operations[i]) res += vals[i + 1];
                else if ('-' === operations[i]) res -= vals[i + 1];
            }
        }

        return res;
    };

    const calcMultDiv = (v) => calc(v, /[*|/]/g, (v2) => parseFloat(v2));
    return calc(value, /[+|-]/g, calcMultDiv);
}

function getNumber1(value) {
    if (!value) return 'Empty string';

    const split = (str, splitters) => {
        let i = 0;
        const arr = [];
        for (let j = 0; j < str.length; j++) {
            if (splitters.indexOf(str[j]) > -1) {
                arr.push(str.substring(i, j));
                arr.push(str[j]);
                i = j + 1;
            }
        }
        arr.push(str.substring(i, str.length));
        return arr;
    };

    const calc = (value, splitters, fnMap) => {
        const vals = split(value, splitters);
        let res = fnMap(vals[0]);
        if (vals.length > 1) {
            for (let i = 0; i < vals.length; i++) {
                if ('*' === vals[i]) res *= fnMap(vals[i + 1]);
                else if ('/' === vals[i]) res /= fnMap(vals[i + 1]);
                else if ('+' === vals[i]) res += fnMap(vals[i + 1]);
                else if ('-' === vals[i]) res -= fnMap(vals[i + 1]);
            }
        }

        return res;
    };

    const calcMultDiv = (v) => calc(v, ['*', '/'], (v2) => parseFloat(v2));
    return calc(value, ['+', '-'], calcMultDiv);
}

const solutions = [getNumber, getNumber1];

let largeExpression = '12/5*9+9.4*2';
for (let i = 0; i < 22; i++) largeExpression += largeExpression;
console.log(largeExpression.length);

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        ['4/2*4-3', '1+2*3', '12/5*9+9.4*2', largeExpression].forEach((v) => {
            // console.log(v);
            assert(eval(v), solution(v));
        });
    });
});
