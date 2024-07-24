const { assert, measurePerformance, TimeMeasure } = require('./../../../Utils');


function done(text) {
    return text;
}

var a = function(done) {
    setTimeout(() => {
        done("result a")
    }, 300);
}
var b = function(done) {
    setTimeout(() => {
        done("result b")
    }, 200);
}

const parallel = (funcArray, doneAll) => {
    let results = [];
    funcArray.map(f => new Promise(resolve => f(resolve)).then(r => results.push(r)));
    new Promise(resolve => {
        const keyInterval = setInterval(() => {
            if (results.length === funcArray.length) {
                clearInterval(keyInterval);
                resolve(results);
            }
        }, 0);
    }).then(doneAll);
}

const parallel2 = async (funcArray, doneAll) => {
    const results = [];
    for (const func of funcArray) {
        // функцию parallel нужно сделать асинхронной
        results.push(await (new Promise((resolve) => func(resolve))));
    }
    doneAll(results);
}

const solutions = [
    parallel,
    parallel2
];

solutions.forEach((solution) => {
    const measure = new TimeMeasure();
    measure.start();
    solution([a,b], (res) => {
        console.log(`Run tests for: ${solution.name}`);
        console.log(res);
        measure.stop();
    })
});
