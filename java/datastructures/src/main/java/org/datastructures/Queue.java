package org.datastructures;

import java.util.NoSuchElementException;

/**
 * A queue implements FIFO (first-in first-out) ordering. As in a line or queue
 * at a ticket stand, items are removed from the data structure in the same
 * order that they are added.
 *
 * A queue can also be implemented with a linked list. In fact, they are
 * essentially the same thing, as long as items are added and removed from
 * opposite sides.
 */
public class Queue<T> {
    private static class QueueNode<T> {
        private T data;
        private QueueNode<T> next;

        public QueueNode(T data) {
            this.data = data;
        }
    }

    private QueueNode<T> first;
    private QueueNode<T> last;

    // Add an item to the end of the list.
    public void add(T item) {
        QueueNode<T> t = new QueueNode<T>(item);
        if (last != null) {
            last.next = t;
        }
        last = t;
        if (first == null) {
            first = last;
        }
    }

    // Remove the first item in the list.
    public T remove() {
        if (first == null)
            throw new NoSuchElementException();
        T data = first.data;
        first = first.next;
        if (first == null) {
            last = null;
        }
        return data;
    }

    // Return the top of the queue.
    public T peek() {
        if (first == null)
            throw new NoSuchElementException();
        return first.data;
    }

    // Return true if and only if the queue is empty.
    public boolean isEmpty() {
        return first == null;
    }

    ///////////////////////////////////////////////////////////////////
    public static void main(String[] args) {
        Queue<Integer> theQueue = new Queue<Integer>();
        theQueue.add(10);
        theQueue.add(20);
        theQueue.add(30);
        theQueue.add(40);

        theQueue.remove();
        theQueue.remove();
        theQueue.remove();

        theQueue.add(50);
        theQueue.add(60);
        theQueue.add(70);
        theQueue.add(80);

        while (!theQueue.isEmpty()) {
            long item = theQueue.remove();
            System.out.print(item + " "); // (40, 50, 60, 70, 80)
        }
        System.out.println();
    }
}
