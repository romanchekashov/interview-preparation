const { TimeMeasure } = typeof require !== 'undefined' ? require('./PerformanceUtils') : PerformanceUtils;
// var fs = require('fs');

function for_loop(len) {
    for (let i = 0, count = 0; i < len; i++){
        count++;
    }
}

function while_loop(len) {
    let i = 0, count = 0;
    while (i++ < len){
        count++;
    }
}

const solutions = [
    for_loop,
    while_loop
];

getResults = () => solutions.reduce((acc, solution) => {
    const res = {name: solution.name, times: []};
    console.log(`\nRun tests for: ${solution.name}`);
    for (let i = 0; i < 3; i++) {
        const length = 1000000 * Math.pow(100, i);
        console.log(`length: ${length}`);
        const measure = new TimeMeasure();
        
        measure.start();
        solution(length);
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
