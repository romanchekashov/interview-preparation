package core;

/**
 * @see <a href="https://www.vogella.com/tutorials/JavaPerformance/article.html">Java Performance - Memory and Runtime Analysis - Tutorial</a>
 */
public class MeasurePerformance {
  private static final long MEGABYTE = 1024L * 1024L;

  public static void measure(Tests tests) {
    long startTime = System.nanoTime();
    tests.tests();
    long stopTime = System.nanoTime();
    long elapsedTimeInNs = stopTime - startTime;
    double elapsedTimeInMs = (double) elapsedTimeInNs / 1000000;
    long memory = usedMemoryInBytes();

//        System.out.printf("Took %d ns%n", elapsedTimeInMs);
//        System.out.printf("Took %.3f ms%n", elapsedTimeInMs);

//        System.out.println("Used memory is bytes: " + memory);
//        System.out.println("Used memory is MB: " + bytesToMegabytes(memory));
//        System.out.printf("Used %.2f MB%n", bytesToMegabytes(memory));

    System.out.printf("Took %.3f ms, Used %.2f mb %n", elapsedTimeInMs, bytesToMegabytes(memory));
  }

  private static double bytesToMegabytes(long bytes) {
    return (double) bytes / MEGABYTE;
  }

  private static long usedMemoryInBytes() {
    // Get the Java runtime
    Runtime runtime = Runtime.getRuntime();
    // Run the garbage collector
    runtime.gc();
    // Calculate the used memory
    return runtime.totalMemory() - runtime.freeMemory();
  }
}
