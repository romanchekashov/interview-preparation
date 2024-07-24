package companies;

import leetcode.AbsLeetCodeSolution;

import java.util.*;

/**
 * Write java function to find number of occurrences of some number in given array of numbers
 *
 * https://www.geeksforgeeks.org/count-number-of-occurrences-or-frequency-in-a-sorted-array/
 */
public class FindNumberOfOccurrencesInArray extends AbsLeetCodeSolution {

    public static void main(String[] args) {
        new FindNumberOfOccurrencesInArray().executeTests();
    }

    @Override
    public void tests() {
        doAssert(countOccurrences(new Integer[]{ 1, 2, 2, 2, 2, 3, 4, 7, 8, 8 }, 2) == 4);
        doAssert(countOccurrences2(new Integer[]{ 1, 2, 2, 2, 2, 3, 4, 7, 8, 8 }, 2) == 4);
//        doAssert(countPair(List.of(1, 2, 3, 4, 1, -1, -1, -2, 2, -2, 3, 4, -4, 11, -5, 9, -5)) == 3);
    }

    /**
     * Function to count occurrences
     *
     * Time Complexity: O(n)
     * Auxiliary Space: O(1), as no extra space is used
     *
     * @param clist
     * @param x
     * @return
     */
    static int countOccurrences(Integer[] clist, int x) {
        // returning the frequency of
        // element x in the ArrayList
        // using Collections.frequency() method
        return Collections.frequency(Arrays.asList(clist), x);
    }

    /**
     * Time Complexity: O(n)
     * Space Complexity: O(1), as no extra space is used
     *
     * @param clist
     * @param x
     * @return
     */
    static int countOccurrences2(Integer[] clist, int x) {
        int count = 0;
        for (int num: clist) {
            if (num == x) count++;
        }
        return count;
    }

}
