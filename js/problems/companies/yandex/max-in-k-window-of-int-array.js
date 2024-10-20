const { assert, measurePerformance } = require('../../../Utils');

const showArrayWithWindow = (array, left, right) => {
    return `window = [${array.map((v, idx) => left === idx ? '[' + v : right === idx ?  v + ']' : v)}]`
    // return `window{leftIdx = ${left}, rightIdx = ${right}, [${array.map((v, idx) => left === idx ? '[' + v : right === idx ?  v + ']' : v)}]}`
}
/**
 * Test case 1:
 * input:  array = [6, 2, 3, 7, 0], k = 3
 * [[6, 2, 3], 7, 0] --> 6
 * [6, [2, 3, 7], 0] --> 7
 * [6, 2, [3, 7, 0]] --> 7
 * output: [6, 7, 7]
 *
 * O(n) time | O(k) space
 *
 * @param {number[]} intArray array of integer numbers
 * @param {number} k window size
 * @return {number[]} result sorted array with max elements from each window
 */
function getMaxArrayInKWindowOfIntArray(intArray, k) {
    console.log(`intArray = [${intArray}], k = ${k}`)

    const result = [];
    const deque = [0] // deck stores indices of intArray where each element smaller than previous and first element is a maximum of window
    const lastWindowIdx = k - 1

    console.log(`call[0]: ${showArrayWithWindow(intArray, 0 - lastWindowIdx, 0)}, deque = [${deque}], dequeArrayValues = [${deque.map(idx => intArray[idx])}], result = [${result}]`)

    // O(intArray.length)
    for (let i = 1; i < intArray.length; i++) {
        // remove left index which outside of window
        if (deque[0] < i - lastWindowIdx) { // O(1) if it was deck, but here js array can be worst O(maxDeckIntArrayIdxWindow.length)
            console.log(`  remove first element from deque: ${deque[0]}, dequeArrayValue = ${intArray[deque[0]]}`)
            deque.shift()
        }

        // O(1) since each element from intArray removed and added to maxDeckIntArrayIdxWindow only once
        let deckRightIdx = deque.length - 1
        while (deckRightIdx >= 0 && intArray[i] > intArray[deque[deckRightIdx--]]) {
            console.log(`  remove last element from deque: ${deque[deckRightIdx + 1]}, dequeArrayValue = ${intArray[deque[deckRightIdx + 1]]}`)
            deque.pop() // O(1) remove from deck/jsArray end
        }
        deque.push(i) // O(1)
        console.log(`  add index ${i} to deque, dequeArrayValue = ${intArray[i]}`)

        // O(1)
        if (i >= lastWindowIdx) {
            console.log(`    add first element of deque to result: ${deque[0]}, dequeArrayValue = ${intArray[deque[0]]}`)
            result.push(intArray[deque[0]])
        }

        console.log(`call[${i}]: ${showArrayWithWindow(intArray, i - lastWindowIdx, i)}, deque = [${deque}], dequeArrayValues = [${deque.map(idx => intArray[idx])}], result = [${result}]`)
    }

    return result;
}

const solutions = [getMaxArrayInKWindowOfIntArray];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([6, 7, 7], solution([6, 2, 3, 7, 0], 3));
    });
});
