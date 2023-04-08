// const { Queue } = require('./Queue');
const { QueueArray } = require('./QueueArray');
const { QueueCircularBuffer } = require('./QueueCircularBuffer');
const { QueueLinkedList } = require('./QueueLinkedList');

[QueueArray, QueueCircularBuffer, QueueLinkedList].forEach(queue => {
    const q = new queue(3);
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    console.log(q.size()); // 3
    console.log(q.dequeue()); // 1
    console.log(q.size()); // 2
    q.clear();
    console.log(q.isEmpty()); // true
})
