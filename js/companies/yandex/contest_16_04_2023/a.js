const { assert, measurePerformance } = require('./../../../Utils');

/**
 *
 *
 */
function a(data) {
    const signal1LettersMap = new Map();
    const signal2Numeric = [];

    for (const {time, value} of data) {
        const isNumeric = value[0] === '0' || value[0] === '1';

        if (isNumeric) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === '1') {
                    signal2Numeric.push(BigInt(time) + BigInt(i));
                }
            }
        } else {
            for (let i = 0; i < value.length; i++) {
                signal1LettersMap.set(BigInt(time) + BigInt(i), value[i]);
            }
        }
    }

    return signal2Numeric.reduce((acc, cur) => acc + signal1LettersMap.get(cur), '');
}

const solutions = [a];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        // 01234567890123456
        // yandex__adventure
        // ___010___01111
        assert('event', solution([
            {
                time: 0,
                value: 'yandex'
            },
            {
                time: 8,
                value: 'adventure',
            },
            {
                time: 3,
                value: '010',
            },
            {
                time: 9,
                value: '01111',
            }
        ]));
    });
});
