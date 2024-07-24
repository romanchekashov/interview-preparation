package core;

import java.util.Arrays;
import java.util.Collections;

public class Sorting {

    public static void main(String[] args) {
        var w = System.out;
        int[] a = {3, 2, 1};

        int fromIndex = 1, toIndex = 3;
        Arrays.sort(a, fromIndex, toIndex); // 3, 1, 2
        w.println(Arrays.toString(a));

        Arrays.sort(a); // 1, 2, 3
        w.println(Arrays.toString(a));

        // Sorting array in descending order
        Integer[] boxedA = Arrays.stream(a).boxed().toArray(Integer[]::new);
        Arrays.sort(boxedA, Collections.reverseOrder()); // 3, 2, 1
        w.println(Arrays.toString(boxedA));

        Collections.sort(Arrays.asList(boxedA));
    }
}
