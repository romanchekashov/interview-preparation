package hard.classes;

public class SynchronizedExample {
    private int count = 0;
    private final Object lock = new Object();

    public void increment() {
        synchronized (lock) { // compare-and-swap (CAS), block added to object
            count++;
        }
    }

    public int getCount() {
        synchronized (lock) {
            return count;
        }
    }
}
