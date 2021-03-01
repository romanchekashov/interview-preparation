const { Sortable } = require('./Sortable');

class BubbleSort extends Sortable {
    /**
     * Sort the array using bubble sort. The idea behind bubble sort is to look for adjacent indexes which
     * are out of place and interchange their elements until the entire array is sorted.
     * @param {*} values
     */
    sort(values) {
        if (!values) return;

        let sorted;
        do {
            sorted = true;
            for (let i = 1; i < values.length; i++) {
                if (values[i] < values[i - 1]) {
                    this._swap(values, i - 1, i);
                    sorted = false;
                }
            }
        } while (!sorted);
    }

    _swap(values, i, j) {
        const t = values[i];
        values[i] = values[j];
        values[j] = t;
    }
}

module.exports = { BubbleSort };
