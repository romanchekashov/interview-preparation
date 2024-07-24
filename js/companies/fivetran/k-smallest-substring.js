const { assert, measurePerformance, complexityMeasure } = require('./../../Utils');

/**
 * https://www.fivetran.com/blog/software-engineering-interview
 *
 * k-smallest-substring
 *
 * @param input_str {string}
 * @param k {number}
 * @return {string}
 * @constructor
 */
function getSubstring(input_str, k) {
  const complexity = complexityMeasure(input_str.length, k);
  let l = 0, r = 0, countOnes = input_str[0] === '1' ? 1 : 0;
  let minSubstr = input_str;

  const updateMin = (l, r) => {
    const str = input_str.substring(l, r + 1);
    complexity.increment(str.length);
    if (str.length < minSubstr.length || (str.length === minSubstr.length && str < minSubstr)) minSubstr = str;
  }

  while (r < input_str.length) {
    // console.log(l, r, countOnes);
    if (countOnes === k) {
      updateMin(l, r);
      if (input_str[l] === '1') {
        countOnes--;
        l++;
      }

      while (input_str[l] === '0') {
        l++
      };
      continue;
    } else {
      r++
      complexity.increment();
    }
    if (input_str[r] === '1') {
      countOnes++;
    }
  }

  complexity.printIncrement();
  return minSubstr;
}

// O(n * k) time | O(k | (< n)) space
function getSubstring_best(input_str, k) {
  const len = input_str.length;
  let l = 0, r = 0, countOnes = 0;
  let minSubstr = input_str;

  const updateMin = (l, r) => {
    const str = input_str.substring(l, r);
    if (str.length < minSubstr.length || (str.length === minSubstr.length && str < minSubstr)) minSubstr = str;
  }

  while (r < len) {
    while (r < len && countOnes !== k) {
      if (input_str[r] === '1') {
        countOnes++;
      }
      r++;
    }
    while (countOnes === k) {
      if (input_str[l] === '1') {
        countOnes--;
        updateMin(l, r);
      }
      l++;
    }
  }
  return minSubstr;
}

function getSubstring3(input_str, k) {
  const len = input_str.length;
  let l = 0, r = 0, countOnes = 0;
  let minL = 0, minR = len;

  const updateMin = (l, r) => {
    const strLen = r - l, minStrLen = minR - minL;

    if (strLen < minStrLen) {
      minL = l;
      minR = r;
    }
    if (strLen === minStrLen) {
      for (let i = 0; i < strLen; i++) {
        if (input_str[l + i] < input_str[minL + i]) {
          minL = l;
          minR = r;
          break;
        } else if (input_str[minL + i] < input_str[l + i]) {
          break;
        }
      }
    }
  }

  while (r < len) {
    while (r < len && countOnes !== k) {
      if (input_str[r] === '1') {
        countOnes++;
      }
      r++;
    }
    while (countOnes === k) {
      if (input_str[l] === '1') {
        countOnes--;
        updateMin(l, r);
      }
      l++;
    }
  }

  return input_str.substring(minL, minR);
}

const solutions = [
  getSubstring,
  getSubstring_best,
  getSubstring3
];

const expected = new Array(100).fill(1).join('');
const input_str = new Array(1000000).fill(1).join('');

solutions.forEach((solution) => {
  console.log(`Run tests for: ${solution.name}`);
  measurePerformance(() => {
    assert('1011', solution('0101101', 3));
    assert('101', solution('10101', 2));
    assert('111', solution('1111111', 3));
    assert(expected, solution(input_str, expected.length));
  });
});
