const { BubbleSort } = require('./BubbleSort');

const initArray = [10, 4, 6, 8, 13, 2, 3];

const sorter = new BubbleSort();
const arrCopy = [...initArray];
sorter.sort(arrCopy);
// Prints:
// [2, 3, 4, 6, 8, 10, 13]
console.log(arrCopy);
