// const { TimeMeasure } = typeof require !== 'undefined' ? require('./PerformanceUtils') : PerformanceUtils;
// var fs = require('fs');

function filter_map(arr) {
    return arr.filter(o => o.id % 2 === 0).map(o => ({...o}));
}

function map_filter(arr) {
    return arr.map(o => ({...o})).filter(o => o.id % 2 === 0);
}

function reduce(arr) {
    return arr.reduce((acc, o) => {
        if (o.id % 2 === 0) acc.push({...o});
        return acc;
    }, []);
}

function for_loop(arr) {
    const res = [];
    for (const o of arr) {
        if (o.id % 2 === 0) res.push({...o});
    }
    return res;
}

const solutions = [
    filter_map,
    map_filter,
    reduce,
    for_loop,
];

const SIZES = [100, 1000, 10000, 100000, 1000000];

getResults = () => solutions.reduce((acc, solution) => {
    const res = {name: solution.name, times: []};
    console.log(`\nRun tests for: ${solution.name}`);
    for (const length of SIZES) {
        console.log(`length: ${length}`);
        const arr = Array.from({length}, (_, i) => ({id: i + 1}));
        const measure = new TimeMeasure();
        
        measure.start();
        solution(arr);
        const measureResult = measure.stop();
        measure.log(measureResult);
        res.times.push({size: length, timeInMS: measureResult.tookMS, usedMb: measureResult.usedMb});
    }
    acc.push(res);
    return acc;
}, []);

// fs.writeFile('filter_map_reduce_compare.json', JSON.stringify(getResults()), function (err) {
//     if (err) throw err;
//     console.log('File is created successfully.');
// });
