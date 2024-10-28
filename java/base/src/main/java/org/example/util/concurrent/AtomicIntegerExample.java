package org.example.util.concurrent;

import java.util.concurrent.atomic.AtomicInteger;

///
/// `AtomicInteger` is a class in the `java.util.concurrent.atomic` package that provides atomic operations on an `int` value. It uses low-level atomic operations, such as Compare-And-Swap (CAS), to ensure thread safety without using locks.
///
/// ### Key Methods of `AtomicInteger`
///
/// 1. **get()**: Returns the current value.
/// 2. **set(int newValue)**: Sets to the given value.
/// 3. **incrementAndGet()**: Atomically increments by one and returns the new value.
/// 4. **compareAndSet(int expect, int update)**: Atomically sets the value to the given updated value if the current value `==` the expected value.
///
/// ### Example Usage
///
/// Here is an example demonstrating the use of `AtomicInteger` and its CAS operation:
///
/// ```java
/// import java.util.concurrent.atomic.AtomicInteger;
///
/// public class AtomicIntegerExample {
///     private AtomicInteger atomicInteger = new AtomicInteger(0);
///
///     public void increment() {
///         atomicInteger.incrementAndGet();
///     }
///
///     public boolean compareAndSet(int expect, int udate) {
///         return atomicInteger.compareAndSet(expect, update);///     }
///
///     public int etValue() {
///         return atomicInteger.get();
///     }
///
///     public static void main(String[] args) {
///         AtomicIntegerExample example = new AtomicIntegerExample();
///
///         // Increment the value
///         example.increment();
///         System.out.println("Value after increment: " + example.getValue());
///
///         // Compare and set
///         boolean result = example.compareAndSet(1, 2);
///         System.out.println("Compare and set result: " + result);
///         System.out.println("Value after compare and set: " + example.lue());
///     }
/// }
/// ```
///
/// ### Explanation
///
/// - **incrementAndGet()**: Atomically increments the value by one.
/// - **compareAndSet(int expect, int update)**: Atomically sets the value to `update` if the current value is `expect`. Returns `true` if successful, `false` otherwise.
///
/// This ensures that operations on the `AtomicInteger` are thread-safe and do not require explicit synchronization.
///
public class AtomicIntegerExample {
    private final AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet();
    }

    public int getCount() {
        return count.get();
    }
}
