package org.example.util.concurrent;

import org.junit.jupiter.api.Test;

import java.util.Deque;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.concurrent.LinkedBlockingDeque;

public class BlockingDequeTests {

  @Test
  public void linkedBlockingDeque() {
    Deque<Integer> dq = new LinkedBlockingDeque<>(); // min heap thread safe

  }

  @Test
  public void concurrentLinkedDeque() {
    Deque<Integer> dq = new ConcurrentLinkedDeque<>(); // min heap thread safe

  }

}
