package core;

import java.util.Arrays;

public class BinarySearch {

    public static void main(String[] args) {
        var w = System.out;
        int[] intArr = {70, 10, 60, 20 };
        int intKey = 20;
        w.println(Arrays.binarySearch(intArr, intKey)); // -3
        Arrays.sort(intArr);
        w.println(Arrays.toString(intArr));
        w.println(Arrays.binarySearch(intArr, intKey)); // 1
    }
}
