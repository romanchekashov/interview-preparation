const { assert, measurePerformance } = require('../../../Utils');

function add(a, b) {
  return (BigInt(a) + BigInt(b)).toString();
}

function add2(a, b) {
  let res = '';
  const aIsNegative = a[0] === '-', bIsNegative = b[0] === '-';
  if (aIsNegative) a = a.substring(1);
  if (bIsNegative) b = b.substring(1);
  let operation = '+';
  if (aIsNegative && bIsNegative) {
    res += '-';
  } else if (aIsNegative) {
    if (a.length < b.length || (a.length === b.length)) {
      operation = '-';
    }
  } else if (a.length > b.length && bIsNegative) {
    operation = '-';
  } else
  if (a.length > b.length) {

  }
  return '' + (+a + +b);
}

const solutions = [add, add2];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert('0', solution('10000000000000', '-10000000000000'));
        assert('1801439850948198', solution('900719925474099', '900719925474099'));
        assert('0', solution('900719925474099', '-900719925474099'));
    });
});
