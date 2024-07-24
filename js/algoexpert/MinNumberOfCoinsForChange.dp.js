const { assert, measurePerformance, complexityMeasure } = require('./../Utils');

function minNumberOfCoinsForChange(n, denoms) {
    if (n === 0) return 0;

    // find max sutable coin value denoms index
    let sorted = denoms.filter(a => a <= n);
    // sorted.sort((a, b) => b - a)
    // console.log(sorted)

    const len = sorted.length;
    let minCount = Number.POSITIVE_INFINITY, l = 0, count = 0, target = n;

    while (l < len) {
        for (let i = l; i < len; i++) {
            while (sorted[i] <= target) {
                count++;
                target -= sorted[i];
                // console.log(sorted[i], target, count)
            }
        }

        if (target === 0) {
            minCount = Math.min(minCount, count);
        }

        target = n;
        count = 0;
        l++;
    }
    return minCount < Number.POSITIVE_INFINITY ? minCount : -1;
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

const solutions = [minNumberOfCoinsForChange, minNumberOfCoinsForChange_DP];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        // assert(2, solution(135, [39, 45, 130, 40, 4, 1, 60, 75]));
        assert(3, solution(10, [1, 3, 4]));
    });
});
