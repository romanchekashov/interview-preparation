package com.problems.leetcode;

public class LeetCode28_Implement_strStr extends AbsLeetCodeSolution {

    public static void main(String[] args) {
        new LeetCode28_Implement_strStr().executeTests();
    }

    @Override
    public void tests() {
        doAssert(strStr("hello", "ll") == 2);
        doAssert(strStr("aaaaa", "bba") == -1);
        doAssert(strStr("aaa", "aaaaa") == -1);
        strStr("mississippi", "issip");
        strStr("mississippi", "issipi");
        strStr("", "");
    }

    public int strStr(String haystack, String needle) {
        if (needle.length() == 0)
            return 0;
        if (needle.length() > haystack.length())
            return -1;

        int first = -1, i = 0, j = 0;

        while (i < haystack.length() && j < needle.length()) {

            if (needle.charAt(j) == haystack.charAt(i)) {
                j++;
                if (first == -1)
                    first = i;
            } else if (first != -1) {
                j = 0;
                i = first;
                first = -1;
            }

            i++;
        }

        return j == needle.length() ? first : -1;
    }

}
