const { assert, measurePerformance } = require('./../../../Utils');

// This is a JavaScript coding problem from BFE.dev
/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */
function flatRecur(arr, depth = 1) {
    // your implementation here
    let hasInnerArray = false;

    const flattenArr = arr.reduce((acc, cur) => {
        if (Array.isArray(cur)) {
            cur.forEach(v => {
                acc.push(v);

                if (!hasInnerArray) {
                    hasInnerArray = Array.isArray(v);
                }
            });
        } else {
            acc.push(cur);
        }

        return acc;
    }, []);

    return depth === 1 || !hasInnerArray ? flattenArr : flatRecur(flattenArr, depth - 1);
}

function flatIter(arr, depth = 1) {
    // your implementation here
    let flattenArr = arr;
    let hasInnerArray = true;

    while (depth-- && hasInnerArray) {
        hasInnerArray = false;

        flattenArr = flattenArr.reduce((acc, cur) => {
            if (Array.isArray(cur)) {
                cur.forEach(v => {
                    acc.push(v);

                    if (!hasInnerArray) {
                        hasInnerArray = Array.isArray(v);
                    }
                });
            } else {
                acc.push(cur);
            }

            return acc;
        }, []);
    }

    return flattenArr;
}

const solutions = [
    flatRecur,
    flatIter
];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        const arr = [1, [2], [3, [4]]];

        assert([1, 2, 3, [4]], solution(arr));
        assert([1, 2, 3, [4]], solution(arr, 1));
        assert([1, 2, 3, 4], solution(arr, 2));
        assert([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], solution([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]], Infinity));
    });
});
