const { assert, measurePerformance } = require('./../../../Utils');

// This is a JavaScript coding problem from BFE.dev

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
    // your code here
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    };
}

const solutions = [
    curry
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        const join = (a, b, c) => {
            return `${a}_${b}_${c}`
        };

        const curriedJoin = solution(join);

        assert('1_2_3', curriedJoin(1, 2, 3));
        assert('1_2_3', curriedJoin(1)(2, 3));
        assert('1_2_3', curriedJoin(1, 2)(3));
        assert('1_2_3', curriedJoin(1)(2)(3));
    });
});
