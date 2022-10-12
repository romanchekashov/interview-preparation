const { assert, measurePerformance } = require('./../../../Utils');

// This is a JavaScript coding problem from BFE.dev

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
    // your code here
    return function curried(...args) {
        const complete = args.length >= fn.length && !args.slice(0, fn.length).includes(curry.placeholder);
        if(complete) return fn.apply(this, args)
        return function(...newArgs) {
            // replace placeholders in args with values from newArgs
            const res = args.map(arg => arg === curry.placeholder && newArgs.length ? newArgs.shift() : arg);
            return curried(...res, ...newArgs);
        }
    }
}

curry.placeholder = Symbol();

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
        const _ = curry.placeholder;

        assert('1_2_3', curriedJoin(1, 2, 3));
        assert('1_2_3', curriedJoin(_, 2)(1, 3));
        assert('1_2_3', curriedJoin(_, _, _)(1)(_, 3)(2));
    });
});
