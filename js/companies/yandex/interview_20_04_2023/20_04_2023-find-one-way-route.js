const { assert, measurePerformance } = require('../../../Utils');

/**
 * У вас есть набор перемешанных билетов. Нужно расположить билеты так, чтобы получился один маршрут.
 * Примечание: известно, что в маршруте нет петель
 *
 * Пример:
 * Input: [
 *   {from: 'Astana', to: 'Moscow'},
 *   {from: 'Amsterdam', to: 'Belgrade'},
 *   {from: 'Belgrade', to: 'Istanbul'},
 *   {from: 'Istanbul', to: 'Astana'},
 *   {from: 'NY', to: 'Amsterdam'},
 *   {from: 'Moscow', to: 'Kazan'},
 * ]
 * Output:
 * [
 *   {from: 'NY', to: 'Amsterdam'},
 *   {from: 'Amsterdam', to: 'Belgrade'},
 *   {from: 'Belgrade', to: 'Istanbul'},
 *   {from: 'Istanbul', to: 'Astana'},
 *   {from: 'Astana', to: 'Moscow'},
 *   {from: 'Moscow', to: 'Kazan'},
 * ]
 *
 * Complexity: O(n) time | O(n) space
 *
 * @tag single-linked list has head node and there are no nodes linked to it
 * @param {{from: string, to: string}[]} list билеты перемешаны
 * @return {{from: string, to: string}[]} билеты расположены согласно маршруту
 */
function findOneWayRoute(list) {
    const result = [];

    const toSet = new Set();
    const fromMap = new Map();

    for (const ticket of list) {
        toSet.add(ticket.to);
        fromMap.set(ticket.from, ticket);
    }

    let initialFrom; // Single-linked list head
    for (const {from} of list) {
        if (!toSet.has(from)) {
            initialFrom = from;
            break;
        }
    }

    let ticket = fromMap.get(initialFrom);

    while (ticket) {
        result.push(ticket);
        ticket = fromMap.get(ticket.to);
    }

    return result;
}

const solutions = [findOneWayRoute];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        assert([
            {from: 'NY', to: 'Amsterdam'},
            {from: 'Amsterdam', to: 'Belgrade'},
            {from: 'Belgrade', to: 'Istanbul'},
            {from: 'Istanbul', to: 'Astana'},
            {from: 'Astana', to: 'Moscow'},
            {from: 'Moscow', to: 'Kazan'},
        ], solution(
            [
                {from: 'Astana', to: 'Moscow'},
                {from: 'Amsterdam', to: 'Belgrade'},
                {from: 'Belgrade', to: 'Istanbul'},
                {from: 'Istanbul', to: 'Astana'},
                {from: 'NY', to: 'Amsterdam'},
                {from: 'Moscow', to: 'Kazan'},
            ]
        ));
    });
});
