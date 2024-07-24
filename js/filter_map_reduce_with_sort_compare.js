// const { TimeMeasure } = typeof require !== 'undefined' ? require('./PerformanceUtils') : PerformanceUtils;
// var fs = require('fs');

function filter_map(arr) {
    return arr.filter(o => o.id % 2 === 0).map(o => ({...o})).sort((o1, o2) => o1.id - o2.id);
}

function map_filter(arr) {
    return arr.map(o => ({...o})).filter(o => o.id % 2 === 0).sort((o1, o2) => o1.id - o2.id);
}

function reduce_inner_sort(arr) {
    return arr.reduce((acc, o) => {
        if (o.id % 2 === 0) acc.push({...o});
        acc.sort((o1, o2) => o1.id - o2.id);
        return acc;
    }, []);
}

function reduce_sort_at_end(arr) {
    return arr.reduce((acc, o) => {
        if (o.id % 2 === 0) acc.push({...o});
        return acc;
    }, []).sort((o1, o2) => o1.id - o2.id);
}

function for_loop_inner_sort(arr) {
    const res = [];
    for (const o of arr) {
        if (o.id % 2 === 0) res.push({...o});
        res.sort((o1, o2) => o1.id - o2.id);
    }
    return res;
}

function for_loop_sort_at_end(arr) {
    const res = [];
    for (const o of arr) {
        if (o.id % 2 === 0) res.push({...o});
    }
    return res.sort((o1, o2) => o1.id - o2.id);
}

const _solutions = [
    filter_map,
    map_filter,
    reduce_sort_at_end,
    for_loop_sort_at_end,
    reduce_inner_sort,
    for_loop_inner_sort,
];

const _SIZES = [100, 1000, 10000, 100000, 1000000];

getResults = () => _solutions.reduce((acc, solution) => {
    const res = {name: solution.name, times: []};
    console.log(`\nRun tests for: ${solution.name}`);
    for (const length of _SIZES) {
        console.log(`length: ${length}`);
        if (solution.name.includes('inner_sort') && length >= 100000) {
            console.log('skip');
            continue;
        }
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


// fs.writeFile('filter_map_reduce_with_sort_compare.json', JSON.stringify(getResults()), function (err) {
//     if (err) throw err;
//     console.log('File is created successfully.');
// });
