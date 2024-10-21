package com.problems.patterns.stack;

import com.problems.AbsLeetCodeSolution;
import com.problems.MeasurePerformance;

import java.util.ArrayList;
import java.util.Map;
import java.util.Stack;

/**
 * https://leetcode.com/problems/valid-parentheses/
 * 20. Valid Parentheses
 *
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 *
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 */
public class ValidParentheses_leetCode_easy_20 extends AbsLeetCodeSolution {

  /**
   * Approach: Stack
   * - put open brackets to stack
   * - on close bracket compare last stack element with related (to close) open bracket
   * - if same remove but if not means bracket open close order is not valid
   *
   * Time complexity: O(n)
   * Space complexity: O(n)
   *
   * @param s
   * @return
   */
  // Took 0.022 ms, Used 2.23 mb (fastest)
  public boolean isValid(String s) {
    var stack = new char[s.length()];
    var stackPtr = -1;

    for (char c: s.toCharArray()) {
      var open = closeToOpen(c);
      if (open != ' ') {
        if (stackPtr > -1 && stack[stackPtr] == open) {
          stack[stackPtr--] = ' ';
        } else {
          return false;
        }
      } else {
        stack[++stackPtr] = c;
      }
    }

    return stackPtr == -1;
  }

  private char closeToOpen(char c) {
    return switch (c) {
      case ')' -> '(';
      case ']' -> '[';
      case '}' -> '{';
      default -> ' ';
    };
  }

  // O(n) time | O(n) space
  // Took 0.050 ms, Used 1.53 mb (optimal)
  public boolean isValid2(String s) {
    var closeToOpen = Map.of(')', '(', ']', '[', '}', '{');
    var stack = new ArrayList<Character>();

    for (char c: s.toCharArray()) {
      var open = closeToOpen.get(c);
      if (open != null) {
        if (!stack.isEmpty() && stack.getLast().equals(open)) {
          stack.removeLast();
        } else {
          return false;
        }
      } else {
        stack.add(c);
      }
    }
    return stack.isEmpty();
  }

  // Took 0.275 ms, Used 1.53 mb (worst)
  public boolean isValid3(String s) {
    var stack = new Stack<Character>();
    for (char c : s.toCharArray()) {
      if (c == '(') stack.push(')');
      else if(c == '{') stack.push('}');
      else if(c == '[') stack.push(']');
      else if (stack.isEmpty() || stack.pop() != c)
        return false;
    }
    return stack.isEmpty();
  }

  @Override
  public void tests() {
    doAssert(isValid("()"), true);
    doAssert(isValid("()[]{}"), true);
    doAssert(isValid("(]"), false);
    doAssert(isValid("([])"), true);
  }

  public static void main(String[] args) {
    MeasurePerformance.measure(() -> {
      var obj = new ValidParentheses_leetCode_easy_20();
      doAssert(obj.isValid("()"), true);
      doAssert(obj.isValid("()[]{}"), true);
      doAssert(obj.isValid("(]"), false);
      doAssert(obj.isValid("([])"), true);
    });

    MeasurePerformance.measure(() -> {
      var obj = new ValidParentheses_leetCode_easy_20();
      doAssert(obj.isValid2("()"), true);
      doAssert(obj.isValid2("()[]{}"), true);
      doAssert(obj.isValid2("(]"), false);
      doAssert(obj.isValid2("([])"), true);
    });

    MeasurePerformance.measure(() -> {
      var obj = new ValidParentheses_leetCode_easy_20();
      doAssert(obj.isValid3("()"), true);
      doAssert(obj.isValid3("()[]{}"), true);
      doAssert(obj.isValid3("(]"), false);
      doAssert(obj.isValid3("([])"), true);
    });
  }
}
