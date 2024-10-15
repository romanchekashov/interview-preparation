package org.example.util.concurrent;

import org.example.util.concurrent.blocking_queue.DelayedElement;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;

import java.util.Queue;
import java.util.concurrent.*;

import static org.junit.jupiter.api.Assertions.assertThrows;

public class BlockingQueueTests {

  @Test
  public void linkedBlockingQueue_deadlock() {
    assertThrows(TimeoutException.class, () -> {
      try {
        CompletableFuture
                .supplyAsync(() -> {
                  // Create a LinkedBlockingQueue with a capacity of 1
                  BlockingQueue<String> queue = new LinkedBlockingQueue<>(1);

                  // Add elements to the queue
                  try {
                    queue.put("Element1");
                    queue.put("Element2"); // Element2 is never added while Element1 is still in the queue
                  } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                  }

                  System.out.println("Never reached because the queue is full");
                  return null;
                })
                .orTimeout(2, TimeUnit.SECONDS)
                .get();
      } catch (ExecutionException e) {
        if (e.getCause() instanceof TimeoutException) throw e.getCause();
      }
    });
  }

  @Test
  @Timeout(2)
  public void linkedBlockingQueue() throws InterruptedException {
    // Create a LinkedBlockingQueue with a capacity of 1
    BlockingQueue<String> queue = new LinkedBlockingQueue<>(1);

    // Add element to the queue and retrieve and remove elements from the queue
    queue.put("Element1");
    System.out.println("Taken: " + queue.take());
    queue.put("Element2");
    System.out.println("Taken: " + queue.take());

    // Check if the queue is empty
    System.out.println("Is the queue empty? " + queue.isEmpty());
  }

  @Test
  public void arrayBlockingQueue() {
    Queue<Integer> q = new ArrayBlockingQueue<>(1); // min heap thread safe

  }

  @Test
  public void priorityBlockingQueue() {
    Queue<Integer> q = new PriorityBlockingQueue<>(); // min heap thread safe

  }

  /**
   * A DelayQueue is a specialized implementation of a blocking queue where elements can only be taken when their delay has expired.
   * @throws InterruptedException
   */
  @Test
  public void delayQueue() throws InterruptedException {
    DelayQueue<DelayedElement> delayQueue = new DelayQueue<>();

    // Add elements to the DelayQueue
    delayQueue.put(new DelayedElement("Element3", 15, TimeUnit.SECONDS));
    delayQueue.put(new DelayedElement("Element2", 10, TimeUnit.SECONDS));
    delayQueue.put(new DelayedElement("Element1", 5, TimeUnit.SECONDS));

    System.out.println("Elements added to the DelayQueue");

    // Take elements from the DelayQueue
    while (!delayQueue.isEmpty()) {
      DelayedElement element = delayQueue.take();
      System.out.println("Taken: " + element);
    }

  }

  @Test
  public void synchronousQueue() {
    Queue<Integer> q = new SynchronousQueue<>(); // min heap thread safe

  }

  @Test
  public void linkedTransferQueue() {
    Queue<Integer> q = new LinkedTransferQueue<>(); // min heap thread safe

  }

  @Test
  public void concurrentLinkedQueue() {
    Queue<Integer> q = new ConcurrentLinkedQueue<>(); // min heap thread safe

  }

  /**
   * Read more: https://www.baeldung.com/java-collections
   */
  @Test
  public void collectionFramework_Demo() {
    Queue<Integer> priorityBlockingQueue = new PriorityBlockingQueue<>(); // min heap thread safe
    priorityBlockingQueue.add(1);
    priorityBlockingQueue.peek();
    priorityBlockingQueue.element(); // same as peek but throws exception if empty
    priorityBlockingQueue.poll();
    priorityBlockingQueue.remove(); // same as poll but throws exception if empty
    priorityBlockingQueue.isEmpty();
    priorityBlockingQueue.size();
  }

}
