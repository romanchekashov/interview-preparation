package com.problems.patterns.backtracking;

import com.problems.AbsLeetCodeSolution;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * https://leetcode.com/problems/generate-parentheses/description/
 * Medium
 *
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 */
public class GenerateParentheses_leetCode_medium_22 extends AbsLeetCodeSolution {

  /**
   * Approach: Backtracking
   * 1. Create a list to store the result
   * 2. Start backtracking
   * 3. If the length of the string is equal to 2*n, then add the string to the result list
   * 4. If the number of open brackets is less than n, then add an open bracket and recursively call the function
   * 5. If the number of open brackets is greater than the number of close brackets, then add a close bracket and recursively call the function
   * 6. Return the result list
   *
   * Time complexity: O(4^n/sqrt(n)) where n is the number of pairs of parentheses
   * Space complexity: O(4^n/sqrt(n)) to store the result
   *
   * Took 0.076 ms, Used 1.26 mb
   *
   * @param n
   * @return
   */
  public List<String> generateParenthesis(int n) {
    List<String> res = new ArrayList<>();
    backtrack(res, new StringBuilder(), n, 0 , 0);
    return res;
  }

  void backtrack(List<String> res, StringBuilder sb, int n, int open, int close) {
    if (sb.length() == n * 2) {
      res.add(sb.toString());
      return;
    }

    if (open < n) {
      sb.append('(');
      backtrack(res, sb, n, open + 1, close);
      sb.deleteCharAt(sb.length() - 1);
    }

    if (open > close) {
      sb.append(')');
      backtrack(res, sb, n, open, close + 1);
      sb.deleteCharAt(sb.length() - 1);
    }
  }

  @Override
  public void tests() {
    doAssert(generateParenthesis(3), List.of("((()))","(()())","(())()","()(())","()()()"));
    doAssert(generateParenthesis(1), List.of("()"));
  }

  public static void main(String[] args) {
    new GenerateParentheses_leetCode_medium_22().executeTests();
  }
}

/*
class Solution {
    public List<String> generateParenthesis(int n) {
        var result = new ArrayList<String>();
        var current = new char[n*2];
        generate(0, 0, current, 0, result, n);
        return result;
    }

    void generate(int open, int close, char[] current, int currentIdx, List<String> result, int n) {
        if (open + close == 2 * n) {
            result.add(String.copyValueOf(current));
            return;
        }

        if (open < n) {
            current[currentIdx] = '(';
            generate(open + 1, close, current, currentIdx + 1, result, n);
        }
        if (close < open) {
            current[currentIdx] = ')';
            generate(open, close + 1, current, currentIdx + 1, result, n);
        }
    }
}
*/
