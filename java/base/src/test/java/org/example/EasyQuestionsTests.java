package org.example;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileNotFoundException;
import java.net.URISyntaxException;
import java.util.*;
import java.util.concurrent.PriorityBlockingQueue;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class EasyQuestionsTests {

    @Test
    public void primitivesByValue_Demo() {
        int first = 1;
        int second = 1;

        // ==
        Assertions.assertSame(first, second);
        // equals
        Assertions.assertEquals(first, second);
    }

    ///
    /// Java's `Integer` class contains the `IntegerCache` to improve performance and memory efficiency when dealing with frequently used integer values. Here's a detailed explanation:
    ///
    /// ### Why `IntegerCache` Exists
    ///
    /// 1. **Autoboxing Efficiency**:
    ///    Java supports autoboxing, which allows you to automatically convert between primitive types (like `int`) and their corresponding wrapper classes (like `Integer`). Autoboxing occurs frequently, especially when working with collections or APIs that require object types (e.g., `List<Integer>` instead of `int[]`).
    ///
    ///    Without caching, every time you boxed an `int` into an `Integer`, a new `Integer` object would have to be created, even for commonly used values. This would lead to unnecessary object creation and memory consumption.
    ///
    /// 2. **Caching Common Values**:
    ///    Most applications frequently use small integer values (e.g., for loop counters, array indices, etc.). To avoid creating new `Integer` objects for every occurrence of these values, Java uses the `IntegerCache` to cache instances of `Integer` for a predefined range of values. By default, this range is from `-128` to `127`.
    ///
    ///    When you box an `int` in this range, Java uses the cached instance from `IntegerCache` instead of creating a new `Integer` object, saving memory and improving performance.
    ///
    /// ### How `IntegerCache` Works
    ///
    /// - The `IntegerCache` is a private static inner class in `Integer`. It stores an array of `Integer` objects for the range `-128` to `127` by default.
    /// - When an `int` is autoboxed into an `Integer`, if the value falls within this range, Java retrieves the `Integer` instance from the cache.
    /// - If the value is outside the cache range, a new `Integer` object is created.
    ///
    /// ```java
    /// public class Integer {
    ///     private static class IntegerCache {
    ///         static final int low = -128;
    ///         static final int high;
    ///         static final Integer cache[];
    ///
    ///         static {
    ///             int h = 127;
    ///             // The high value can be configured with the system property "java.lang.Integer.IntegerCache.high"
    ///             cache = new Integer[(high - low) + 1];
    ///             int j = low;
    ///             for (int k = 0; k < cache.length; k++)
    ///                 cache[k] = new Integer(j++);
    ///         }
    ///     }
    ///
    ///     public static Integer valuef(int i) {
    ///         if (i >= IntegerCache.low && i <= IntegerCache.high)
    ///             return IntegerCache.cache[i + (-IntegerCache.low)];
    ///         return new Integer(i);
    ///     }
    /// }
    /// ```
    ///
    /// ### Benefits of `IntegerCache`
    ///
    /// 1. **Memory Efficiency**: It avoids creating redundant `Integer` objects for frequently used values, reducing memory overhead.
    /// 2. **Performance Improvement**: Accessing an object from a cache is much faster than allocating a new object in memory, which leads to better performance for common operations like autoboxing.
    /// 3. **Consistency**: Since cached `Integer` instances are reused, the `==` operator works as expected for comparisons within the cache range (e.g., `Integer i1 = 127; Integer i2 = 127; i1 == i2` will return `true`).
    ///
    /// ### Customizing the Cache Range
    ///
    /// The cache range can be customized using the JVM option `-XX:AutoBoxCacheMax=<size>`, which allows you to adjust the upper bound of the cache. For example, if you know your application frequently uses numbers beyond `127`, you can increase the cache size to improve performance for those numbers.
    ///
    /// ```bash
    /// java -XX:AutoBoxCacheMax=1000 MyApp
    /// ```
    ///
    /// ### Summary:
    /// - **Purpose**: `IntegerCache` exists to optimize performance and memory usage by caching frequently used `Integer` objects.
    /// - **Default Range**: The cache by default ranges from `-128` to `127`.
    /// - **Efficiency**: It reduces object creation and speeds up autoboxing for common integer values.
    ///
    @SuppressWarnings("removal")
    @Test
    public void objectsByValue_Demo() {
        // jvm hack for caching small values
        // https://wiki.owasp.org/index.php/Java_gotchas#Immutable_Objects_.2F_Wrapper_Class_Caching
        Integer first = 1;
        Integer second = 1;

        Assertions.assertSame(first, second);
        Assertions.assertEquals(first, second);

        // extended example
        first = 1337;
        second = 1337;
        Assertions.assertNotSame(first, second);
        Assertions.assertEquals(first, second);

        // typical question
        Assertions.assertNotSame(new Boolean(false), Boolean.FALSE);
        Assertions.assertEquals(false, Boolean.FALSE);
        Assertions.assertSame(false, Boolean.FALSE);
    }

    @Test
    public void isTwoStringsEqual() {
//        String first = "Hello";
//        String second = "Hello";
//        System.out.println(first == second);
//        System.out.println(System.identityHashCode(first));
//        System.out.println(System.identityHashCode(second));
//        Assertions.assertSame(first, second);
//        Assertions.assertEquals(first, second);

        String first = "Hello";
        String second = new String("Hello");
        String third = first + second;
        String fourth = "HelloHello";
        String fifth = "Hello" + "Hello";
        System.out.println(third == fourth);
        System.out.println(System.identityHashCode(third));
        System.out.println(System.identityHashCode(third.intern()));
        System.out.println(System.identityHashCode(fourth));
        System.out.println(System.identityHashCode(fifth));
//        fifth.length()

        String a = new String("hello");
        String b = new String("hello");
        System.out.println(a == b);  // false, because 'a' and 'b' are different objects
        System.out.println(System.identityHashCode(a));
        System.out.println(System.identityHashCode(b));
        System.out.println(a.equals(b));  // true, because 'a' and 'b' are having same content
        System.out.println(a.intern() == b.intern());  // true, because intern() method returns string from string pool
        System.out.println(a.hashCode() == b.hashCode());  // true, because hashcode is calculated based on content
    }

    @Test
    public void hashMapEqualsHashCode_Demo() {
        // regular map
        Map<Long, Long> map = new HashMap<>();
        map.put(1L, 1L);
        Long val = map.get(1L);
        Assertions.assertEquals(1L, val);

        // map with key is mutable object
        Map<Map<Long, Long>, Long> multiMapMap = new HashMap<>();
        multiMapMap.put(map, 2L);

        // build new object to get value => works
        Map<Long, Long> mapKey = new HashMap<>();
        mapKey.put(1L, 1L);
        Long objectValue = multiMapMap.get(mapKey);
        Assertions.assertEquals(2L, objectValue);

        // mutate initial map and try to get => not working
        map.put(2L, 1L);
        Long mutable = multiMapMap.get(map);
        Assertions.assertNotEquals(2L, mutable);

        // try again with same object key => not working
        Long tryAgain = multiMapMap.get(mapKey);
        Assertions.assertNotEquals(2L, tryAgain);

        // try again with modified object key => not working
        mapKey.put(2L, 1L);
        Long tryAgainMutated = multiMapMap.get(mapKey);
        Assertions.assertNotEquals(2L, tryAgainMutated);
    }

    @Test
    public void hashMapBadDistribution_Demo() {
        var map = new HashMap<BadHashDistribution, Integer>();
        for (int i = 1; i < 8; i++) {
            map.put(new BadHashDistribution(String.valueOf(i)), i);
        }
        Integer val = map.get(new BadHashDistribution(String.valueOf(7)));

        Assertions.assertEquals(7, val);
    }

    /**
     * Read more: https://www.baeldung.com/java-collections
     */
    @Test
    public void collectionFramework_Demo() {
        // iterable -> collection -> list, queue, set
        // map not in collections

        // Array
        int[] array = new int[]{1, 2, 3, 4, 5};
//        Arrays.reverse(array);
//        ArraysSupport.reverse(array);
//        array.reverse();

        BitSet bitSet = new BitSet(1024);
        bitSet.set(1);
        bitSet.get(1);
        bitSet.clear(1);
        bitSet.isEmpty();
        bitSet.size();
        bitSet.cardinality(); // count of set bits

        // List
        List<Integer> arrayList = new ArrayList<>();
        List<Integer> linkedList = new LinkedList<>();
        List<Integer> vector = new Vector<>(); // thread safe
        List<Integer> stack = new Stack<>(); // thread safe

        arrayList.add(1);
        arrayList.set(0, 1);
        arrayList.get(0);
        arrayList.remove(0);
        arrayList.isEmpty();
        arrayList.size();
        arrayList.contains(1);
        arrayList.clear();

        // Stack
        List<Integer> arrayListStack = new ArrayList<>();
        arrayListStack.add(1);
        arrayListStack.isEmpty();
        arrayListStack.getLast(); // same as peek but throws exception if empty
        arrayListStack.removeLast(); // same as poll but throws exception if empty

        // Queue
        Queue<Integer> priorityQueue = new PriorityQueue<>(); // min heap
        Queue<Integer> priorityBlockingQueue = new PriorityBlockingQueue<>(); // min heap thread safe
        Queue<Integer> arrayListQueue = new ArrayDeque<>();
        Queue<Integer> linkedListQueue = new LinkedList<>();
        linkedListQueue.add(1);
        linkedListQueue.peek();
        linkedListQueue.element(); // same as peek but throws exception if empty
        linkedListQueue.poll();
        linkedListQueue.remove(); // same as poll but throws exception if empty
        linkedListQueue.isEmpty();
        linkedListQueue.size();

        // Deque
        Deque<Integer> linkedListDeque = new LinkedList<>();
        linkedListDeque.addFirst(1);
        linkedListDeque.peekFirst();
        linkedListDeque.getFirst(); // same as peekFirst but throws exception if empty
        linkedListDeque.pollFirst();
        linkedListDeque.removeFirst(); // same as pollFirst but throws exception if empty
        linkedListDeque.push(1);
        linkedListDeque.pop();

        linkedListDeque.addLast(2);
        linkedListDeque.peekLast();
        linkedListDeque.getLast(); // same as peekLast but throws exception if empty
        linkedListDeque.pollLast();
        linkedListDeque.removeLast(); // same as pollLast but throws exception if empty
        linkedListDeque.isEmpty();
        linkedListDeque.size();

        // Set
        Set<Integer> hashSet = new HashSet<>();
        Set<Integer> linkedHashSet = new LinkedHashSet<>();
        Set<Integer> treeSet = new TreeSet<>();

        hashSet.add(1);
        hashSet.contains(1);
        hashSet.remove(1);
        hashSet.clear();
        hashSet.isEmpty();
        hashSet.size();

        // map is not in collections
        Map<Integer, Integer> hashMap = new HashMap<>();
        Map<Integer, Integer> linkedHashMap = new LinkedHashMap<>();
        Map<Integer, Integer> treeMap = new TreeMap<>();
        // specific map for enum values
        //Map<Integer, Integer> enumMap = new EnumMap<>();

        hashMap.put(1, 1);
        hashMap.containsKey(1);
        hashMap.get(1);
        hashMap.remove(1);
        hashMap.clear();
        hashMap.isEmpty();
        hashMap.size();
    }

    @Test()
    public void checkedException_Demo() throws InterruptedException {
        throw new InterruptedException();
    }

    @Test
    public void unCheckedException_Demo() {
        throw new RuntimeException();
    }

    @Test
    public void optionalOf_Demo() {
        Assertions.assertThrows(NullPointerException.class, () -> Optional.of(null));

        String name = null;
        Assertions.assertEquals(Optional.empty(), Optional.of(new BadHashDistribution(name)).map(v -> v.getName()));
        Assertions.assertThrows(NullPointerException.class, () -> Optional.of(name).orElseGet(() -> "default"));
    }

    @Test
    public void optionalOfNullable_Demo() {
        Assertions.assertEquals(Optional.empty(), Optional.ofNullable(null));

        String name = null;
        Assertions.assertDoesNotThrow(() -> Optional.ofNullable(name).orElseGet(() -> "default"));
    }

    /**
     * More info https://www.baeldung.com/java-threadlocal
     */
    @Test
    public void threadLocal_Demo() throws InterruptedException {
        Runnable shared = new Runnable() {
            private final ThreadLocal<Integer> threadLocal = new ThreadLocal<>();

            @Override
            public void run() {
                System.out.println("before: " + threadLocal.get());

                threadLocal.set((int) (Math.random() * 100D));

                try {
                    // emulate workload
                    Thread.sleep(1000);
                } catch (InterruptedException ignored) {
                }

                System.out.println("after: " + threadLocal.get());
            }
        };

        // concurrent access to data, datarace issues
        Thread first = new Thread(shared, "first");
        Thread second = new Thread(shared, "second");

        // happens before
        first.start();
        second.start();

        first.join();
        second.join();
    }

    /**
     * More info https://jenkov.com/tutorials/java-concurrency/threadlocal.html
     */
    @Test
    public void inheritableThreadLocal_Demo() throws InterruptedException {
        ThreadLocal<String> threadLocal = new ThreadLocal<>();
        InheritableThreadLocal<String> inheritableThreadLocal =
                new InheritableThreadLocal<>();

        Thread thread1 = new Thread(() -> {
            System.out.println("===== Thread 1 =====");
            threadLocal.set("Thread 1 - ThreadLocal");
            inheritableThreadLocal.set("Thread 1 - InheritableThreadLocal");

            System.out.println(threadLocal.get());
            System.out.println(inheritableThreadLocal.get());

            Thread childThread = new Thread(() -> {
                System.out.println("===== ChildThread =====");
                System.out.println(threadLocal.get());
                System.out.println(inheritableThreadLocal.get());
            });
            childThread.start();
            try {
                childThread.join();
            } catch (InterruptedException ignored) {
            }
        });
        Thread thread2 = new Thread(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println("===== Thread2 =====");
            System.out.println(threadLocal.get());
            System.out.println(inheritableThreadLocal.get());
        });

        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();
    }

    @Test
    public void streams_Demo() {
        List<Integer> values = List.of(1, 1, 2, 3, 4, 4, 5, 6);
        Assertions.assertIterableEquals(List.of(2, 4, 6, 8, 10, 12),
                values.stream().distinct().map(v -> v * 2).collect(Collectors.toList()));
        Assertions.assertEquals(6, values.stream().max(Integer::compareTo).get());
        Assertions.assertEquals(1, values.stream().min(Integer::compareTo).get());
    }

    @Test
    public void primitiveStreams_Demo() {
        Assertions.assertEquals(45, IntStream.range(1, 10).sum());
        Assertions.assertIterableEquals(List.of(1, 3, 5, 7, 9),
                IntStream.rangeClosed(1, 10)
                        .filter(i -> i % 2 != 0)
                        .boxed()
                        .collect(Collectors.toList()));
    }

    @Test
    public void tryCatchFinallyReturn_Demo() {
        Supplier<Integer> integerSupplier = new Supplier<Integer>() {
            @Override
            public Integer get() {
                try {
                    return 1;
                } catch (Exception ignored) {
                    return 2;
                } finally {
                    return 3;
                }
            }
        };
        Assertions.assertNotEquals(1, integerSupplier.get());
        Assertions.assertEquals(3, integerSupplier.get());

        Supplier<Integer> integerSupplierWithException = new Supplier<Integer>() {
            @Override
            public Integer get() {
                try {
                    throw new RuntimeException();
                } catch (Exception ignored) {
                    return 2;
                } finally {
                    return 3;
                }
            }
        };

        Assertions.assertNotEquals(2, integerSupplierWithException.get());
        Assertions.assertEquals(3, integerSupplierWithException.get());
    }

    /**
     * Read more: https://recepinanc.medium.com/til-18-prefer-try-with-resources-to-try-catch-finally-afc8c0dc9c05
     */
    @Test
    public void tryCatchFinallyResource_Demo() throws URISyntaxException, FileNotFoundException {
        Scanner scanner = null;
        try {
            scanner = new Scanner(new File(getClass().getClassLoader().getResource("test.txt").toURI()));
            while (scanner.hasNext()) {
                System.out.println(scanner.nextLine());
                throw new RuntimeException("Something happened on reading");
            }
        } finally {
            if (scanner != null) {
                scanner.close();
                throw new RuntimeException("Something happened on closing");
            }
        }
    }

    @Test
    public void tryCatchFinallyResource_Demo2() throws URISyntaxException {
        try {
            throw new IllegalArgumentException("1");
        } catch (Exception e) {
            throw new IllegalArgumentException("2");
        } finally {
            // Perform any necessary cleanup here
            System.out.println("Finally block");
        }
//        System.out.println("After finally block"); // unreachable statement
    }

    @Test
    public void tryWithResource_Demo() throws URISyntaxException {
        try (Scanner scanner = new Scanner(new File(getClass().getClassLoader().getResource("test.txt").toURI()))) {
            while (scanner.hasNext()) {
                System.out.println(scanner.nextLine());
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
