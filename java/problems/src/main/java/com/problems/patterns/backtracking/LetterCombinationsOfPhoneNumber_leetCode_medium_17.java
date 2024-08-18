package com.problems.patterns.backtracking;

import com.problems.AbsLeetCodeSolution;
import com.problems.patterns.TreeNode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

/**
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/
 * Medium
 *
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
 *
 * A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
 */
public class LetterCombinationsOfPhoneNumber_leetCode_medium_17 extends AbsLeetCodeSolution {

  /**
   * Approach: Backtracking
   * 1. If the input is empty, return an empty list
   * 2. Create a mapping table from digits to letters
   * 3. Create a list to store the result
   * 4. Start backtracking
   * 5. If there are no more digits left, the current combination is complete, add it to the result list
   * 6. Get the set of letters corresponding to the current digit
   * 7. Iterate through the letter set
   * 8. Add the current letter to the combination
   * 9. Recursively process the remaining digits
   * 10. Remove the last added letter to try the next one
   * 11. Return the result list
   *
   * Time complexity: O(3^n * 4^m) where n is the number of digits with 3 letters and m is the number of digits with 4 letters
   * Space complexity: O(3^n * 4^m) to store the result
   *
   * @param digits
   * @return
   */
  public List<String> letterCombinations(String digits) {
    // If the input is empty, return an empty list
    if (digits.isEmpty()) return new ArrayList<>();

    // Mapping table from digits to letters
    String[] phoneMap = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    // List to store the result
    List<String> result = new ArrayList<>();
    // Start backtracking
    backtrack(new StringBuilder(), digits, phoneMap, result);
    return result;
  }

  /**
   * Backtracking method
   *
   * [nextDigits.charAt(0) - '2']: the ASCII value of 0 is 48 and the ASCII values of digits (1-9) are 49 - 57,
   * so subtracting the digits ASCII value from 0's ASCII value will give the value of the digit as an integer
   *
   * @param combination
   * @param nextDigits
   * @param phoneMap
   * @param result
   */
  private void backtrack(StringBuilder combination, String nextDigits, String[] phoneMap, List<String> result) {
    // If there are no more digits left, the current combination is complete, add it to the result list
    if (nextDigits.isEmpty()) {
      result.add(combination.toString());
    } else {
      // Get the set of letters corresponding to the current digit
      String letters = phoneMap[nextDigits.charAt(0) - '2'];
      // Iterate through the letter set
      for (char letter : letters.toCharArray()) {
        // Add the current letter to the combination
        combination.append(letter);
        // Recursively process the remaining digits
        backtrack(combination, nextDigits.substring(1), phoneMap, result);
        // Remove the last added letter to try the next one
        combination.deleteCharAt(combination.length() - 1);
      }
    }
  }

  @Override
  public void tests() {
    doAssert(letterCombinations("23"), List.of("ad","ae","af","bd","be","bf","cd","ce","cf"));
    doAssert(letterCombinations(""), Collections.emptyList());
    doAssert(letterCombinations("2"), List.of("a","b","c"));
  }

  public static void main(String[] args) {
    new LetterCombinationsOfPhoneNumber_leetCode_medium_17().executeTests();
  }
}

// class Solution {

//     public List<String> letterCombinations(String digits) {

//         if (digits.isEmpty()) return new ArrayList<>();

//         String[] phone_map = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};


//         List<String> output = new ArrayList<>();

//         backtrack("", digits, phone_map, output);

//         return output;
//     }



//     private void backtrack(String combination, String next_digits, String[] phone_map, List<String> output) {
//         if (next_digits.isEmpty()) {
//             output.add(combination);
//         } else {
//             String letters = phone_map[next_digits.charAt(0) - '2'];
//             for (char letter : letters.toCharArray()) {
//                combination.append(letter);
//                 // 递归处理剩余的数字
//                 backtrack(combination, nextDigits.substring(1), phoneMap, result);
//                 // 移除最后一个加入的字母，准备尝试下一个字母
//                 combination.deleteCharAt(combination.length() - 1);
//             }
//         }
//     }
// }

/*
class Solution {
    public List<String> letterCombinations(String digits) {
        // 如果输入为空，直接返回空列表
        if (digits.isEmpty()) return new ArrayList<>();

        // 数字到字母的映射表
        String[] phoneMap = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        // 存储结果的列表
        List<String> result = new ArrayList<>();
        // 开始回溯
        backtrack(new StringBuilder(), digits, phoneMap, result);
        return result;
    }

    // 回溯方法
    private void backtrack(StringBuilder combination, String nextDigits, String[] phoneMap, List<String> result) {
        // 如果没有剩余的数字，说明当前组合完成，加入结果列表
        if (nextDigits.isEmpty()) {
            result.add(combination.toString());
        } else {
            // 取出当前数字对应的字母集
            String letters = phoneMap[nextDigits.charAt(0) - '2'];
            // 遍历字母集
            for (char letter : letters.toCharArray()) {
                // 将当前字母加入组合
                combination.append(letter);
                // 递归处理剩余的数字
                backtrack(combination, nextDigits.substring(1), phoneMap, result);
                // 移除最后一个加入的字母，准备尝试下一个字母
                combination.deleteCharAt(combination.length() - 1);
            }
        }
    }
}
*/
/*
class Solution {
    public List<String> letterCombinations(String digits) {
        if (digits.isEmpty()) return Collections.emptyList();

        String[] mapping = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        var queue = new LinkedList<String>();
        queue.add("");

        while (queue.peek().length() != digits.length()) {
            var remove = queue.remove();
            var chars = mapping[digits.charAt(remove.length()) - '2'].toCharArray();
            for (char ch: chars) queue.add(remove + ch);
        }
        return queue;
    }
}
*/
