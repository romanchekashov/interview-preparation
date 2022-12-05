package datastructures;

import java.util.EmptyStackException;

/**
 * A stack uses LIFO (last-in first-out) ordering. That is, as in a stack of
 * dinner plates, the most recent item added to the stack is the first item to
 * be removed.
 *
 * Note that a stack can also be implemented using a linked list, if items were
 * added and removed from the same side.
 *
 * A stack can also be used to implement a recursive algorithm iteratively.
 */
public class Stack<T> {
    private static class StackNode<T> {
        private T data;
        private StackNode<T> next;

        public StackNode(T data) {
            this.data = data;
        }
    }

    private StackNode<T> top;

    // Remove the top item from the stack.
    public T pop() {
        if (top == null)
            throw new EmptyStackException();
        T item = top.data;
        top = top.next;
        return item;
    }

    // Add an item to the top of the stack.
    public void push(T item) {
        StackNode<T> t = new StackNode<T>(item);
        t.next = top;
        top = t;
    }

    // Return the top of the stack.
    public T peek() {
        if (top == null)
            throw new EmptyStackException();
        return top.data;
    }

    // Return true if and only if the stack is empty.
    public boolean isEmpty() {
        return top == null;
    }
}
