const { performance } = require('perf_hooks');
const process = require('process');
const { TreeNode } = require('./datastructures/Tree/BinarySearchTree/BinarySearchTree');

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

const createTreeNode = (treeAsArray) => {
    if (treeAsArray.length === 0) return null;

    const root = new TreeNode(treeAsArray[0]);
    const queue = [root];
    let index = 1;

    while (index < treeAsArray.length) {
        for (let i = 0, len = queue.length; i < len; i++) {
            const node = queue.shift();

            let val = treeAsArray[index++];
            if (val !== null) {
                node.left = new TreeNode(val);
                queue.push(node.left);
            }

            val = treeAsArray[index++];
            if (val !== null) {
                node.right = new TreeNode(val);
                queue.push(node.right);
            }
        }
    }

    return root;
};

module.exports = { assert, measurePerformance, createTreeNode };
