const { TimeMeasure } = typeof require !== 'undefined' ? require('./PerformanceUtils') : PerformanceUtils;
// var fs = require('fs');

function for_loop(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++){
        count += arr[i];
    }
    return count;
}

function while_loop(arr) {
    let i = 0, count = 0;
    while (i < arr.length){
        count += arr[i++];
    }
    return count;
}

function for_each(arr) {
    let count = 0;
    arr.forEach(v => {
        count += v;
    });
    return count;
}

const solutions = [
    while_loop,
    for_loop,
    for_each
];

getResults = () => solutions.reduce((acc, solution) => {
    const res = {name: solution.name, times: []};
    console.log(`\nRun tests for: ${solution.name}`);
    for (let i = 1; i <= 4; i++) {
        const length = Math.pow(100, i);
        const arr = Array.from({length}, (_, i) => i + 1); //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        console.log(`length: ${length.toLocaleString()}`);
        const measure = new TimeMeasure();
        
        measure.start();
        console.log(solution(arr));
        const measureResult = measure.stop();
        measure.log(measureResult);
        res.times.push({size: length, timeInMS: measureResult.tookMS, usedMb: measureResult.usedMb});
    }
    acc.push(res);
    return acc;
}, []);
getResults();

// fs.writeFile('filter_map_reduce_compare.json', JSON.stringify(getResults()), function (err) {
//     if (err) throw err;
//     console.log('File is created successfully.');
// });
