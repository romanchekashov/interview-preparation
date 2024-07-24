const { assert, measurePerformance, complexityMeasure } = require('./../Utils');

function levenshteinDistance(str1, str2) {
    for (let i = 0; i < str1.length; i++) {
        let temp1 = str1.substring(0, str1.length - i);
        let temp2 = str1.substring(str1.length - i);

        str2 = str2.replace(temp1, '');
        str2 = str2.replace(temp2, '');
    console.log(temp1, temp2, str2)
    }

    return str2.length;
}

function minNumberOfCoinsForChange_DP(n, denoms) {
    const complexity = complexityMeasure(n, denoms.length);

    const numOfCoins = new Array(n + 1).fill(Number.POSITIVE_INFINITY);
    numOfCoins[0] = 0;

    for (const denom of denoms) {
        for (const amount in numOfCoins) {
            if (denom <= amount) {
                numOfCoins[amount] = Math.min(numOfCoins[amount], 1 + numOfCoins[amount - denom]);
            }
            complexity.increment();
        }
    }
    complexity.printIncrement();

    return numOfCoins[n] !== Number.POSITIVE_INFINITY ? numOfCoins[n] : -1;
}

const solutions = [levenshteinDistance];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert(1, solution('algoexpert', 'algozexpert'));
    });
});
