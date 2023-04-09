/**
 * A dequeue (double-ended queue) is a data structure that allows adding and removing elements from both ends.
 */
class Deque {

    addFront(item) {}

    addRear(item) {}

    removeFront() {}

    removeRear() {}

    isEmpty() {}

    size() {}

    peekFront() {}

    peekRear() {}

    clear() {}
}

const { DequeArray } = require('./DequeArray');

[DequeArray].forEach(deque => {
    const dq = new deque();
    dq.addFront(1);
    dq.addRear(2);
    dq.addFront(3);
    console.log(dq.size()); // 3
    console.log(dq.peekFront()); // 3
    console.log(dq.peekRear()); // 2
    console.log(dq.removeFront()); // 3
    console.log(dq.removeRear()); // 2
    console.log(dq.size()); // 1
    dq.clear();
    console.log(dq.isEmpty()); // true
})

module.exports = { Deque };
