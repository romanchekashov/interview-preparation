const { BinaryHeap } = require('./BinaryHeap');
const { assert, measurePerformance } = require('../../../Utils');

const pq = new BinaryHeap();

pq.push(4);
pq.push(50);
pq.push(7);
pq.push(55);
pq.push(90);
pq.push(87);
pq.push(2);

console.log('' + pq);
assert([2, 50, 4, 55, 90, 87, 7], pq._heap);

const removed = pq.pop();
console.log('removed: ' + removed);
console.log('' + pq);
assert([4, 50, 7, 55, 90, 87], pq._heap);
