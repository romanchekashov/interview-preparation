package org.example.util.concurrent;

import org.example.Util;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;
import java.util.concurrent.*;
import java.util.stream.IntStream;

public class CollectionTests {

  @Test
  public void copyOnWriteArrayList() {
    List<Integer> list = new CopyOnWriteArrayList<>(); // min heap thread safe

  }

  @Test
  public void copyOnWriteArraySet() {
    Set<Integer> set = new CopyOnWriteArraySet<>(); // min heap thread safe

  }

  @Test
  public void concurrentSkipListSet() {
    NavigableSet<Integer> set = new ConcurrentSkipListSet<>(); // min heap thread safe

  }

  @Test
  public void concurrentHashMap() {
    Map<Integer, Integer> map = new ConcurrentHashMap<>(); // min heap thread safe

  }

  @Test
  public void concurrentSkipListMap() {
    NavigableMap<Integer, Integer> map = new ConcurrentSkipListMap<>(); // min heap thread safe

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

  /**
   * https://www.baeldung.com/java-when-to-use-parallel-stream
   * https://www.javatpoint.com/parallel-stream-in-java
   * https://docs.oracle.com/javase/tutorial/collections/streams/parallelism.html
   */
  @Test
  public void parallelStreamBasic() {
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    Util.performanceMeasure(() -> {
      // use shared thread pool, so it's may not work in parallel
      numbers.parallelStream()
              .filter(n -> n % 2 == 0)
              .map(n -> n * n)
              .forEach(num -> {
                var t = Thread.currentThread();
                System.out.printf("Processing %d  on thread(%s, threadId: %d, isVirtual: %b)\n", num, t.getName(), t.threadId(), t.isVirtual());
              });
    });
  }

  @Test
  public void parallelUndefinedBehaviour() {
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    URI uri = null;
    try {
      uri = new URI("https://google.com");
    } catch (URISyntaxException e) {
      throw new RuntimeException(e);
    }

    HttpRequest request = HttpRequest.newBuilder()
            .uri(uri)
            .GET()
            .build();

    var client = HttpClient.newHttpClient();

    numbers.parallelStream()
            .filter(n -> n % 2 == 0)
            // potentially failed call because rest fetch can throw exception and it should be handled for each request
            .map(n -> {
              try {
                return client.send(request, HttpResponse.BodyHandlers.ofString()).body();
              } catch (IOException | InterruptedException e) {
                System.out.println(e.getMessage());
              }
              return null;
            })
            .forEach(System.out::println);
  }

  /**
   * https://www.baeldung.com/java-8-parallel-streams-custom-threadpool
   * https://medium.com/geekculture/pitfalls-of-java-parallel-streams-731fe0c1eb5f
   */
  @Test
  public void parallelStreamWithSpecifiedPool() {
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    ForkJoinPool customThreadPool = new ForkJoinPool(4);

    Util.performanceMeasure(() -> {
      // this will work in parallel because we use custom thread pool with 4 threads
      customThreadPool.submit(() ->
              numbers.parallelStream()
                      .filter(n -> n % 2 == 0)
                      .map(n -> n * n)
                      .forEach(num -> {
                        var t = Thread.currentThread();
                        System.out.printf("Processing %d  on thread(%s, threadId: %d, isVirtual: %b)\n", num, t.getName(), t.threadId(), t.isVirtual());
                      })
      ).join();
    });

    customThreadPool.shutdown();
  }

  ///To use **Java virtual threads** (introduced as a preview in Java 19 as part of Project Loom) with a `parallelStream`, you can't directly make `parallelStream()` use virtual threads, as it internally relies on the **ForkJoinPool**, which uses platform threads (traditional OS-level threads).
  ///
  /// However, you can still achieve parallelism with virtual threads by manually creating and managing the tasks using a **custom executor service** based on virtual threads. Here’s how you can use virtual threads to parallelize tasks:
  ///
  /// ### Explanation:
  /// - `Executors.newVirtualThreadPerTaskExecutor()` creates an executor service that launches each task in a separate virtual thread.
  /// - Instead of using `parallelStream()`, we manually submit tasks to this executor.
  /// - Each task will be run on a virtual thread, and you can see the thread names to confirm.
  ///
  /// This approach gives you parallelism using virtual threads rather than platform threads.
  @Test
  public void virtualThreadParallelStreamExample() {
    // Create a custom ExecutorService using virtual threads
    ExecutorService executorService = Executors.newVirtualThreadPerTaskExecutor();

    try {
      // Example data
      List<Integer> numbers = IntStream.rangeClosed(1, 10).boxed().toList();

      Util.performanceMeasure(() -> {
        // Submit tasks to the virtual thread executor for parallel execution
        numbers.stream()
                .filter(n -> n % 2 == 0)
                .map(n -> n * n)
                .forEach(num -> executorService.submit(() -> {
                  var t = Thread.currentThread();
                  System.out.printf("Processing %d  on thread(%s, threadId: %d, isVirtual: %b)\n", num, t.getName(), t.threadId(), t.isVirtual());
                }));
      });
    } finally {
      // Shut down the executor service
      executorService.shutdown();
    }
  }
}
