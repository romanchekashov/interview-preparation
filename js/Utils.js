const { performance } = require('perf_hooks');
const process = require('process');

const logError = (expected, actual) =>
    console.error(`Assertion Error: Expected: ${expected}, Actual: ${actual}`);

/**
 * Compare expected with actual result
 *
 * @param expected
 * @param actual
 */
function assert(expected, actual) {
    if (Array.isArray(expected)) {
        if (expected.length !== actual.length) {
            logError(expected, actual);
        }

        for (let i = 0; i < expected.length; i++) {
            if (Array.isArray(expected[i]) && Array.isArray(actual[i])) {
                for (let j = 0; j < expected[i].length; j++) {
                    if (expected[i][j] !== actual[i][j]) {
                        logError(expected, actual);
                        return;
                    }
                }
            } else {
                if (expected[i] !== actual[i]) {
                    logError(expected, actual);
                    break;
                }
            }
        }
    } else if (expected !== actual) {
        logError(expected, actual);
    }
}

/**
 * script should be run as: node --expose-gc <script.js>
 * @param {*} fun
 */
function measurePerformance(fun) {
    gc();
    let t0 = performance.now();
    fun();
    let t1 = performance.now();

    const took = t1 - t0;
    const tookSec = Math.floor(took / 1000);
    const tookMS = Math.round((took - tookSec * 1000) * 100) / 100;
    const used = process.memoryUsage().heapUsed / 1024 / 1024;

    console.log(
        `Took ${tookSec ? tookSec + ' s ' : ''}${tookMS} ms, Used ${
            Math.round(used * 100) / 100
        } MB\n`
    );
    // console.log(process.memoryUsage());
}

module.exports = { assert, measurePerformance };
