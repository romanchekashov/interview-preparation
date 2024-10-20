const { assert, measurePerformance } = require('../../../Utils');

/**
 * What the output order?
 * @return {Promise<number[]>}
 */
const promiseOrder = () => new Promise(resolve => {
  const result = [];
  
  const add = (i, suffix) => {
    console.log(i, suffix);
    result.push(i);
  }
  
  add(1, '');
  
  setTimeout(() => add(2, ' setTimeout(fn, 2)'), 2);
  
  setTimeout(() => add(3, ' setTimeout(fn, 0)'), 0);
  
  new Promise(resolve => {
    add(4, ' Promise')
    resolve()
    add(5, ' Promise after resolve()')
  }).then(() => add(6, ' Promise.then first'))
    .then(() => {
      add(7, ' Promise.then second');
      throw new Error();
    })
    .then(() => add(8, ' Promise.then third'))
    .catch(() => add(9, ' Promise.catch first'))
  
  Promise.resolve(10).then(i => add(i, ' Promise.resolve'));
  
  queueMicrotask(() => add(11, ' queueMicrotask'))
  
  const keyInterval = setInterval(() => {
    if (result.length === 10) {
      clearInterval(keyInterval);
      console.log(result);
      resolve(result);
    }
  }, 0);
});

const solutions = [promiseOrder];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(async () => {
        assert([1, 4, 5, 6, 10, 11, 7, 9, 3,  2], await solution());
    });
});
