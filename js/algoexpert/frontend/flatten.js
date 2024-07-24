const { assert, measurePerformance, complexityMeasure } = require('./../../Utils');

function flatten(value) {
    // Write your code here.
    const resAr = [], resOb = {};
    
    const que = (val) => {
        if (isAr(val)) {
            for (const v of val) {
                if (isAr(v) || isOb(v)) {
                    que(v);
                } else {
                    resAr.push(v);
                }
            }
        } else if (isOb(val)) {
            for (const key in val) {
                const v = val[key];
                if (isAr(v) || isOb(v)) {
                    que(v);
                } else {
                    resOb[key] = v;
                }
            }
        }
    }
    
    if ((isAr(value) && value.length) || (isOb(value) && Object.keys(value).length)) {
        que(value);
        return resAr.length ? resAr : resOb;
    }
    return value;
}

const isAr = v => Array.isArray(v);
const isOb = v => v && typeof v === 'object';

const solutions = [flatten];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        console.log(solution({a:{}, b:{}}));
        // assert(1, solution('algoexpert', 'algozexpert'));
    });
});
