/**
 * A shared interface amongst sorting algorithms.
 */
class Sortable {
    sort(values) {
        throw new Error('Not implemented');
    }
}

module.exports = { Sortable };
