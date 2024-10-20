const { assert, measurePerformance } = require('../../../../Utils');

/**
 * Есть отрезки времени активности пользователей.
 * Нужно написать функцию, которая вернет отрезки времени, когда все пользователи активны(онлайн).
 * Пример для двух пользователей:
 * intersect([[8, 12], [14, 21]], [[5, 11], [21, 22]])); // [[8, 11], [21]]
 * Дополнение: Пользователей может быть много.
 *
 * @tag two-pointers
 * @param {number[][]} user1 timeframes then user1 was online
 * @param {number[][]} user2 timeframes then user2 was online
 * @return {number[][]} timeframes then both users were online
 */
function intersect(user1, user2) {
    const result = [];
    let idx1 = 0, idx2 = 0;

    while (idx1 < user1.length && idx2 < user2.length) {
        const timeframe1 = user1[idx1];
        const timeframe2 = user2[idx2];

        const leftOffset = Math.max(timeframe1[0], timeframe2[0]);
        const rightOffset = Math.min(timeframe1[1], timeframe2[1]);

        if (leftOffset < rightOffset) { // timeframes intersecting
            // do smth.
        }
    }

    return result;
}

const solutions = [intersect];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([[8, 11], [21]], solution(
            [[8, 12], [14, 21]],
            [[5, 11], [21, 22]]
        ));
    });
});
