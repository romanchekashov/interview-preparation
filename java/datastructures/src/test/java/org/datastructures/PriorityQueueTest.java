package org.datastructures;

import org.junit.jupiter.api.Test;

public class PriorityQueueTest {

  @Test
  public void testPriorityQueue() {
    PriorityQueue thePQ = new PriorityQueue(5);
    thePQ.insert(30);
    thePQ.insert(50);
    thePQ.insert(10);
    thePQ.insert(40);
    thePQ.insert(20);

    while (!thePQ.isEmpty()) {
      long item = thePQ.remove();
      assert item == 10 || item == 20 || item == 30 || item == 40 || item == 50;
      System.out.print(item + " "); // 10, 20, 30, 40, 50
    }
  }
}
