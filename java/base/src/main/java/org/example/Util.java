package org.example;

import java.util.concurrent.TimeUnit;

public class Util {

  @FunctionalInterface
  public interface PerformanceMeasure {
    void test();
  }

  public static void performanceMeasure(PerformanceMeasure measure) {
    long startTime = System.nanoTime();
    measure.test();
    long endTime = System.nanoTime();
    long nano = endTime - startTime;
    long minutes = TimeUnit.NANOSECONDS.toMinutes(nano);
    long seconds = TimeUnit.NANOSECONDS.toSeconds(nano) - TimeUnit.MINUTES.toSeconds(minutes);
    long milliseconds = TimeUnit.NANOSECONDS.toMillis(nano) - TimeUnit.MINUTES.toMillis(minutes) - TimeUnit.SECONDS.toMillis(seconds);
    String duration = String.format("%d min %d sec %d ms",
            minutes,
            seconds,
            milliseconds
    );
    double usedMem = (double) (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / (1024 * 1024);
    System.out.printf("Took %s, Used %.2f MB%n", duration, usedMem);
  }

  @FunctionalInterface
  public interface SuppressException {
    void mayThrow();
  }

  public static void suppressException(SuppressException suppressException) {
    try {
      suppressException.mayThrow();
    } catch (Exception ex) {
      System.out.println(ex.getMessage());
      ex.printStackTrace();
    }
  }
}
