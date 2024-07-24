if (typeof performance === 'undefined' && typeof require !== 'undefined') {
    const perf_hooks = require('perf_hooks');
    performance = perf_hooks.performance;
}
const process = typeof require !== 'undefined' ? require('process') : undefined;

class TimeMeasure {
    /**
     * script should be run as: node --expose-gc <script.js>
     * @param {*} func
     */
    async measurePerformance(func) {
        this.start();
        if (this.#isAsync(func)) {
            await func();
        } else {
            func();
        }
        this.log(this.stop());
    }
    
    start() {
        typeof gc !== 'undefined' && gc();
        this.t0 = performance.now();
    }
    
    stop() {
        this.t1 = performance.now();
        return this.#calc();
    }
    
    #calc() {
        const took = this.t1 - this.t0;
        const tookSec = Math.floor(took / 1000);
        const tookMS = Math.round(took * 1000) / 1000;
        const used = typeof process !== 'undefined' ? process.memoryUsage().heapUsed / 1024 / 1024 : 0;
        return {tookSec, tookMS, usedMb: Math.round(used * 1000) / 1000};
    }
    
    log({tookSec, tookMS, usedMb}) {
        const tookMSWithoutSec = Math.round((tookMS - tookSec * 1000) * 1000) / 1000;
        console.log(`Took ${tookSec ? tookSec + ' s ' : ''}${tookMSWithoutSec} ms, Used ${usedMb} MB`);
    }
    
    #isAsync = (func) => func.constructor.name === "AsyncFunction";
}

/**
 * console.log(getMaxCallStackSize());
 *
 * @return {number} max call stack size
 */
const getMaxCallStackSize = () => {
    const _getMaxCallStackSize = i => {
        try {
            return _getMaxCallStackSize(++i);
        } catch (e) {
            console.log(e);
            return i;
        }
    }

    return _getMaxCallStackSize(1);
}

const complexityMeasure = function(...sizes) {
    const product = sizes.reduce((acc, cur) => acc * cur, 1);
    const sum = sizes.reduce((acc, cur) => acc + cur, 0);

    console.log(`Input: sizes = ${sizes}: Product(sizes) = ${product}, Sum(sizes) = ${sum}`)

    let counter = 0;

    return {
        increment: (steps = 1) => {counter += steps;},
        printIncrement: () => {
            let min = Math.abs(counter - sum) < Math.abs(counter - product) ? sum : product;
            console.log(`Iterations: ${counter}, Time complexity close to O(${min === sum ? 'Sum' : 'Product'})\n`);
        }
    }
}

PerformanceUtils = {
    measurePerformance: (func) => new TimeMeasure().measurePerformance(func),
    TimeMeasure,
    getMaxCallStackSize,
    complexityMeasure
};

if (typeof module !== 'undefined') module.exports = PerformanceUtils;
