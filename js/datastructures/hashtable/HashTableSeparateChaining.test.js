const { HashTableSeparateChaining } = require('./HashTableSeparateChaining');

const map = new HashTableSeparateChaining(20);

map.set(null, 1);
map.set(undefined, 2);
map.set(3, 3);
map.set('four', 4);

console.log([...map]);

map.set(3, -3);

console.log([...map]);

map.delete(3);
map.delete(null);

console.log([...map]);
