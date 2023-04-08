const { Stack } = require('./Stack');

const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);

console.log(stack.pop()); // 5
console.log(stack.pop()); // 4
console.log(stack.pop()); // 3
console.log(stack.pop()); // 2
console.log(stack.pop()); // 1
console.log('isEmpty: ', stack.isEmpty()); // true
