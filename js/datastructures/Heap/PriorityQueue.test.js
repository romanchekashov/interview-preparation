const { assert, measurePerformance } = require('../../Utils');
const { PriorityQueue } = require('./PriorityQueue');

const pq = new PriorityQueue();

pq.add(4);
pq.add(50);
pq.add(7);
pq.add(55);
pq.add(90);
pq.add(87);
pq.add(2);

console.log('' + pq);
assert([2, 50, 4, 55, 90, 87, 7], pq.heap);

const removed = pq.remove();
console.log('removed: ' + removed);
console.log('' + pq);
assert([4, 50, 7, 55, 90, 87], pq.heap);
