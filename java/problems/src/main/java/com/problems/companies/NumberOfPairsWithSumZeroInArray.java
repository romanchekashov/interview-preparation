package com.problems.companies;

import com.problems.AbsLeetCodeSolution;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Write java function which calculates number of pairs in array. Pair is when two numbers added together, result is zero.
 *
 * https://websparrow.org/java/java-count-number-of-pairs-in-the-array-whose-sum-is-zero
 * Solution:
 * 1. Remove all duplicate elements from the array.
 * 2. Iterate the elements and check whether it’s positive/negative elements available in the array.
 * 3. If available, remove that element from the array and increment the counter value by 1.
 */
public class NumberOfPairsWithSumZeroInArray extends AbsLeetCodeSolution {

    public static void main(String[] args) {
        new NumberOfPairsWithSumZeroInArray().executeTests();
    }

    @Override
    public void tests() {
        doAssert(countPair(List.of(1, 3, 6, -1, 5, -3, -1, 6, -8, 3)) == 2);
        doAssert(countPair(List.of(1, 1, 1, 1, 1, 1, 1, 1)) == 0);
        doAssert(countPair(List.of(1, 2, 3, 4, 1, -1, -1, -2, 2, -2, 3, 4, -4, 11, -5, 9, -5)) == 3);
    }

    public static int countPair(List<Integer> numbers) {
        int count = 0;
        Set<Integer> uniqueNumbers = new HashSet<>(numbers);
        System.out.println("Unique numbers: " + uniqueNumbers);
        for (int num: numbers) {
            if (uniqueNumbers.contains(num) && uniqueNumbers.contains(-num)) {
                uniqueNumbers.remove(num);
                count++;
            }
        }
        return count;
    }

}
