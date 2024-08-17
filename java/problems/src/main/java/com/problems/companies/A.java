package com.problems.companies;

import com.problems.AbsLeetCodeSolution;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 *
 */
public class A extends AbsLeetCodeSolution {

    public static void main(String[] args) {
        new A().executeTests();
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
