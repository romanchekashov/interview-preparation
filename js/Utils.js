const PerformanceUtils = require('./PerformanceUtils');
const { TreeNode } = require('./datastructures/trees/BinarySearchTree/BinarySearchTree');
const { ListNode } = require('./datastructures/linear/LinkedList/LinkedList');

const logError = (expected, actual) =>
  console.error('Assertion Error: Expected: ', expected, 'Actual: ', actual);

const isEqual = (expected, actual) => {
    if (typeof expected === 'object' && typeof actual === 'object') {
        if (JSON.stringify(expected) !== JSON.stringify(actual)) {
            throw new Error()
        }
    } else {
        if (expected !== actual) {
            throw new Error();
        }
    }
}
/**
 * Compare expected with actual result
 *
 * @param expected
 * @param actual
 * @param {boolean} checkOrder
 */
function assert(expected, actual, checkOrder = true) {
    if (Array.isArray(expected)) {
        if (expected.length !== actual.length) {
            logError(expected, actual);
        }

        if (checkOrder) {
            try {
                for (let i = 0; i < expected.length; i++) {
                    if (Array.isArray(expected[i]) && Array.isArray(actual[i])) {
                        for (let j = 0; j < expected[i].length; j++) {
                            isEqual(expected[i][j], expected[i][j])
                        }
                    } else {
                        isEqual(expected[i], actual[i])
                    }
                }
            } catch (err) {
                logError(expected, actual);
            }
        } else {
            const expectedSet = new Set(expected)
            for (const v of actual) {
                if (!expectedSet.has(v)) {
                    logError(expected, actual);
                    return;
                }
            }
        }
    } else if (expected !== actual) {
        logError(expected, actual);
    }
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

const createSinglyLinkedList = (arr, pos = -1) => {
    let head = null, temp = null, cycle = null;

    for (let i = 0; i < arr.length; i++) {
        if (temp) {
            temp.next = new ListNode(arr[i]);
            temp = temp.next;
        } else {
            head = new ListNode(arr[i]);
            temp = head;
        }

        if (i === pos) {
            cycle = temp;
        }
    }

    if (temp && cycle) {
        temp.next = cycle;
    }

    return head;
}

module.exports = {
  assert,
  createTreeNode,
  createSinglyLinkedList,
  measurePerformance: PerformanceUtils.measurePerformance,
  TimeMeasure: PerformanceUtils.TimeMeasure,
  getMaxCallStackSize: PerformanceUtils.getMaxCallStackSize,
  complexityMeasure: PerformanceUtils.complexityMeasure
};
