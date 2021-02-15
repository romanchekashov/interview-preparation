/**
 * Hash table (HT) is a data structure that provides a mapping from keys to values using a technique called hashing.
 * key-value pairs: keys must be unique, but values can be repeated.
 * Key can be any object but it should be hashable!
 *
 * A hash function H(x) is a function that maps a key 'x' to a whole number in a fixed range.
 * Exp: H(x) = (x^2 - 6*x + 9) mod 10 - maps all integer keys to the range [0,9].
 *
 * IMPORTANT:
 * 1 - If H(x) = H(y) then objects x and y might be equal, but if H(x) != H(y) then x and y are certainly not equal!
 * 2 - A hash func H(x) must be deterministic! If H(x) = y then H(x) must always produce y and never another value.
 * 3 - We try very hard to make uniform hash functions to minimize the number of hash collisions(i. e. H(x) = H(y)).
 * 4 - Keys used in our hash table are immutable. Hence, if a key of type T is immutable,
 * and we have a H(k) defined for all keys k of type T then we say a key of type T is hashable.
 *
 * Time complexity: Insert, Search, Remove takes O(1)* time using a hash func as a way to index into a hash table.
 * (*) The constant time behaviour attributed to hash tables is only true if you have a good uniform hash func!
 *
 * NOTE: Hash functions for files are more sophisticated than those used for hashtables.
 * Instead for files we use what are called cryptographic hash functions also called checksums.
 *
 * The two most popular HASH COLLISION resolution techniques are SEPARATE CHAINING and OPEN ADDRESSING:
 *
 * SEPARATE CHAINING deals with hash collisions by maintaining a data structure (usually a LinkedList)
 * to hold all the different values which hashed to a particular value.
 *
 * OPEN ADDRESSING deals with hash collisions by finding another place within the hash table for the object to go
 * by offsetting it from the position to which it hashed to.
 */
