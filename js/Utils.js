const { performance } = require('perf_hooks');
const process = require('process');

function assert(expected, actual) {
    if (expected !== actual) {
        console.error(
            `Assertion Error: Expected: ${expected}, Actual: ${actual}`
        );
    }
}

/**
 * script should be run as: node --expose-gc <script.js>
 * @param {*} fun
 */
function measurePerformance(fun) {
    let t0 = performance.now();
    fun();
    let t1 = performance.now();
    const took = t1 - t0;
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(
        `Took ${Math.round(took * 100) / 100} ms, Used ${
            Math.round(used * 100) / 100
        } MB`
    );
    // console.log(process.memoryUsage());
    gc();
}

module.exports = { assert, measurePerformance };
