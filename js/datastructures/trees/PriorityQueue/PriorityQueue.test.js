const { PriorityQueue } = require('./PriorityQueue');
const { assert, measurePerformance } = require('../../../Utils');

const pq = new PriorityQueue();

pq.push(4);
pq.push(50);
pq.push(7);
pq.push(55);
pq.push(90);
pq.push(87);
pq.push(2);

console.log('' + pq);
assert([2, 50, 4, 55, 90, 87, 7], pq.toArray());

const removed = pq.pop();
console.log('removed: ' + removed);
console.log('' + pq);
assert([4, 50, 7, 55, 90, 87], pq.toArray());
