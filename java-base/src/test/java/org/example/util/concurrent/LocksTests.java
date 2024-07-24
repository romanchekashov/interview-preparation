package org.example.util.concurrent;

import org.junit.jupiter.api.Test;

import java.util.concurrent.ForkJoinPool;

public class LocksTests {
  /**
   * https://www.geeksforgeeks.org/lock-framework-vs-thread-synchronization-in-java/
   * https://winterbe.com/posts/2015/04/30/java8-concurrency-tutorial-synchronized-locks-examples/
   * https://www.baeldung.com/java-concurrent-locks
   * https://jenkov.com/tutorials/java-concurrency/read-write-locks.html
   */
  @Test
  public void synchronizedVsLocksTest() {
    ReentrantLockExample lockExample = new ReentrantLockExample(); // then you need separate code to different parts
    SynchronizedExample synchronizedExample = new SynchronizedExample();
    AtomicIntegerExample atomicIntegerExample = new AtomicIntegerExample();
    ReadWriteLockExample readWriteLockExample = new ReadWriteLockExample();

    ForkJoinPool customThreadPool = new ForkJoinPool(4);

    for (int i = 0; i < 10; i++) {
      customThreadPool.submit(() -> {
        lockExample.increment();
        System.out.println("lock =" + lockExample.getCount());
        synchronizedExample.increment();
        System.out.println("synchronized =" + synchronizedExample.getCount());
        atomicIntegerExample.increment();
        System.out.println("atomic =" + atomicIntegerExample.getCount());
        readWriteLockExample.increment();
        System.out.println("readWrite =" + readWriteLockExample.getCount());
      });
    }

    customThreadPool.shutdown();
  }
}
