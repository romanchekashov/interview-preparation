package datastructures;

class PriorityQueue {
    // array in sorted order, from max at 0 to min (size - 1)
    private int maxSize;
    private long[] queArray;
    private int nItems;

    public PriorityQueue(int s) {
        maxSize = s;
        queArray = new long[maxSize];
        nItems = 0;
    }

    public void insert(long item) {
        int j;

        if (nItems == 0) { // if no items,
            queArray[nItems++] = item; // insert at 0
        } else { // if items,
            for (j = nItems - 1; j >= 0; j--) { // start at end,
                if (item > queArray[j]) { // if new item larger,
                    queArray[j + 1] = queArray[j]; // shift upward
                } else { // if smaller,
                    break; // done shifting
                }
            }

            queArray[j + 1] = item; // insert it
            nItems++;
        }
    }

    /**
     * remove minimum item
     *
     * @return
     */
    public long remove() {
        return queArray[--nItems];
    }

    /**
     * peek at minimum item
     *
     * @return
     */
    public long peekMin() {
        return queArray[nItems - 1];
    }

    /**
     * true if queue is empty
     *
     * @return
     */
    public boolean isEmpty() {
        return (nItems == 0);
    }

    /**
     * true if queue is full
     *
     * @return
     */
    public boolean isFull() {
        return (nItems == maxSize);
    }

    ///////////////////////////////////////////////////////////////////
    public static void main(String[] args) {
        PriorityQueue thePQ = new PriorityQueue(5);
        thePQ.insert(30);
        thePQ.insert(50);
        thePQ.insert(10);
        thePQ.insert(40);
        thePQ.insert(20);

        while (!thePQ.isEmpty()) {
            long item = thePQ.remove();
            System.out.print(item + " "); // 10, 20, 30, 40, 50
        }
        System.out.println();
    }
}
