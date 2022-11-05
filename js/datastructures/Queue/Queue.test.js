const { Queue } = require('./Queue');

const q = new Queue();

q.offer(1);
q.offer(2);
q.offer(3);
q.offer(4);
q.offer(5);

console.log(q.poll()); // 1
console.log(q.poll()); // 2
console.log(q.poll()); // 3
console.log(q.poll()); // 4

console.log(q.isEmpty()); // false

q.offer(1);
q.offer(2);
q.offer(3);

console.log(q.poll()); // 5
console.log(q.poll()); // 1
console.log(q.poll()); // 2
console.log(q.poll()); // 3

console.log(q.isEmpty()); // true
