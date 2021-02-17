package java.leetcode;

public abstract class AbsLeetCodeSolution {

    public void executeTests() {
        long startTime = System.nanoTime();
        tests();
        long endTime = System.nanoTime();

        System.out.println(String.format("Took %d ns", (endTime - startTime)));
        System.out.println(String.format("Used %.2f MB",
                (double) (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / (1024 * 1024)));
    }

    public abstract void tests();

    public void doAssert(boolean check) {
        if (!check)
            throw new IllegalArgumentException("Fail!");
    }
}
