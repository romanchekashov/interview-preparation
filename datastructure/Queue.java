package datastructure;

public class Queue {
    private int maxSize;
    private long[] queArray;
    private int front;
    private int rear;
    private int nItems;

    public Queue(int s) {
        maxSize = s;
        queArray = new long[maxSize];
        front = 0;
        rear = -1;
        nItems = 0;
    }

    public void offer(long j) { // put item at rear of queue
        if (rear == maxSize - 1) { // deal with wraparound
            rear = -1;
        }
        queArray[++rear] = j; // increment rear and insert
        nItems++; // one more item
    }

    public long remove() { // take item from front of queue
        long temp = queArray[front++]; // get value and incr front
        if (front == maxSize) { // deal with wraparound
            front = 0;
        }
        nItems--; // one less item
        return temp;
    }

    public long peekFront() { // peek at front of queue
        return queArray[front];
    }

    public boolean isEmpty() { // true if queue is empty
        return (nItems == 0);
    }

    public boolean isFull() { // true if queue is full
        return (nItems == maxSize);
    }

    public int size() { // number of items in queue
        return nItems;
    }

    ///////////////////////////////////////////////////////////////////
    public static void main(String[] args) {
        Queue theQueue = new Queue(5);
        theQueue.offer(10);
        theQueue.offer(20);
        theQueue.offer(30);
        theQueue.offer(40);

        theQueue.remove();
        theQueue.remove();
        theQueue.remove();

        theQueue.offer(50);
        theQueue.offer(60);
        theQueue.offer(70);
        theQueue.offer(80);

        while (!theQueue.isEmpty()) {
            long item = theQueue.remove();
            System.out.print(item + " "); // (40, 50, 60, 70, 80)
        }
        System.out.println();
    }
}
