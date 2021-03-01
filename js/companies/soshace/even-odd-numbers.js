const { assert, measurePerformance } = require('./../../Utils');

function differentEvenness_replace(input1) {
    const arr = input1.replace(/\"/g, '').split(' ');
    const even = [];
    const odd = [];

    for (let i = 0; i < arr.length; i++) {
        if (parseInt(arr[i]) % 2 === 0) {
            even.push(i);
        } else {
            odd.push(i);
        }

        if (even.length === 1 && odd.length > 1) return even[0] + 1;
        if (odd.length === 1 && even.length > 1) return odd[0] + 1;
    }
}

function differentEvenness_match(input1) {
    const arr = input1.match(/\d+/g);
    const even = [];
    const odd = [];

    for (let i = 0; i < arr.length; i++) {
        if (parseInt(arr[i]) % 2 === 0) {
            even.push(i);
        } else {
            odd.push(i);
        }

        if (even.length === 1 && odd.length > 1) return even[0] + 1;
        if (odd.length === 1 && even.length > 1) return odd[0] + 1;
    }
}

function differentEvenness_match_Katrin(input1) {
    let oddCounter = 0;
    let evenCounter = 0;
    let output = 0;

    let array = input1.match(/\d+/g);
    array.map((item, index) => {
        if (item % 2 === 0) {
            // even
            evenCounter++;
            if (evenCounter <= 1) {
                output = index + 1;
            }
        } else {
            // odd
            oddCounter++;
            if (oddCounter <= 1) {
                output = index + 1;
            }
        }
    });

    return output;
}

const solutions = [
    differentEvenness_replace,
    differentEvenness_match,
    differentEvenness_match_Katrin,
];

const inputArr = [];
for (let i = 12; i < 1e6; i += 2) inputArr.push(i);
const input = '"2 4 7 8 10 ' + inputArr.join(' ') + '"';

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(3, solution('"2 4 7 8 10"'));
        assert(2, solution('"1 2 1 1"'));
        assert(3, solution('"1 3 2"'));
        assert(3, solution(input));
    });
});
