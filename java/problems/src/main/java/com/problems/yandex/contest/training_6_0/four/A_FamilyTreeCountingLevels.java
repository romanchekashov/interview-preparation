package com.problems.yandex.contest.training_6_0.four;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.StringTokenizer;
import java.util.TreeSet;

///
/// #### [Тренировки по алгоритмам 6.0 от Яндекса — Занятие 4 (Деревья, представления и обходы)](https://contest.yandex.ru/contest/66795/problems/)
/// ### [A. Родословная: подсчет уровней](https://contest.yandex.ru/contest/66795/problems/)
///
/// В генеалогическом древе у каждого человека, кроме родоначальника, есть ровно один родитель.
/// Каждому элементу дерева сопоставляется целое неотрицательное число, называемое высотой.
/// У родоначальника высота равна 0, у любого другого элемента высота на 1 больше, чем у его родителя.
/// Вам дано генеалогическое древо, определите высоту всех его элементов.
///
/// #### Формат ввода
/// Программа получает на вход число элементов в генеалогическом древе N.
/// Далее следует N−1 строка, задающие родителя для каждого элемента древа, кроме родоначальника.
/// Каждая строка имеет вид имя_потомка имя_родителя.
///
/// #### Формат вывода
/// Программа должна вывести список всех элементов древа в лексикографическом порядке.
/// После вывода имени каждого элемента необходимо вывести его высоту.
///
/// - Ограничение времени	1 секунда
/// - Ограничение памяти	64Mb
///
public class A_FamilyTreeCountingLevels {

    static int nextInt(StringTokenizer token) {
        return Integer.parseInt(token.nextToken());
    }

    static long nextLong(StringTokenizer token) {
        return Long.parseLong(token.nextToken());
    }

    ///
    /// To analyze the time complexity of the provided code snippet, we need to identify the major components of the code and how they contribute to its overall complexity.
    ///
    /// ### Code Breakdown
    ///
    /// 1. **Input Reading**: The program first reads an integer `t`, which is the number of nodes in a tree, and for `t - 1` iterations, it reads pairs of child and parent nodes.
    ///
    ///    **Complexity**: Reading `t` lines and processing each line (parsing child and parent) takes `O(t)`, where each read and parse operation involves constant time operations.
    ///
    /// 2. **Data Structures**:
    ///     - A `TreeSet<String> names`: This data structure is used to store unique names (both parents and children). The `TreeSet` provides logarithmic time complexity for insertion and lookup due to its underlying self-balancing binary search tree.
    ///     - A `HashMap<String, String> childToParent`: This is a hash table that maps each child to its parent, allowing for average constant time complexity for insertion and lookups.
    ///
    /// 3. **Populating Data Structures**:
    ///    In the for loop that runs `t - 1` times:
    ///    ```java
    ///    childToParent.put(child, parent);
    ///    names.add(child);
    ///    names.add(parent);
    ///    ```
    ///    - Each insertion into `childToParent` is `O(1)` on average due to the `HashMap`.
    ///    - Each insertion into `names` (a `TreeSet`) is `O(log n)`, where `n` is the number of unique names inserted so far. However, since we're adding two names for each of the `t - 1` relationships, the growth of the number of unique names won't exceed `2(t - 1)`, giving a logarithmic factor relative to the number of unique names.
    ///
    /// 4. **Counting Parents**:
    ///    The second part of the code iterates over each name in the `names` `TreeSet`:
    ///    ```java
    ///    for (var name : naes) {
    ///        var child = name;
    ///        var parentsCount = 0;
    ///        while (childToParent.containsKey(chid)) {
    ///            parentsCount++;
    ///            child = childToParent.get(child);
    ///    }
    ///    }
    ///    ```
    ///    - For each name, there is a loop that climbs the hierarchy until it finds a node without a parent. The while loop's average complexity depends on the depth of the tree:
    ///      - In the worst case, this could be `O(h)` where `h` is the height of the tree (i.e., the number of ancestors for the deepest node).
    ///    - Given that tree heights might be approximately logarithmic for balanced trees, for this loop, the total time taken across all names could be `O(t * h)` in the worst case.
    ///
    /// ### Total Time Complexity
    ///
    /// - **Reading the Input**: `O(t)`.
    /// - **Populating Data Structures**: `O((t - 1) * log n)` due to `TreeSet`.
    /// - **Counting Ancestors**: In the worst case across all names, where `h` is the average depth, the complexity would be `O(k * h)` where `k` is the number of unique names (can be at most `2 * (t - 1)`).
    ///
    /// Thus, combining everything, the overall time complexity can be approximated as:
    ///
    /// \[
    /// \text{Total Time Complexity} = O(t) + O(t \log n) + O(t \cdot h)
    /// \]
    ///
    /// For simplistic purposes, we can derive it to be approximately \(O(t \log n)\) since typically `h` (height of a balanced tree) may not exceed \(\log t\) in many cases where the tree is balanced.
    ///
    /// ### Conclusion
    ///
    /// In summary, the time complexity of the provided code can be generally represented as \(O(t \log n)\), where `t` is the number of child-parent relationships and `n` is the number of unique names. The specific performance will depend on the structure of the relationships in the tree (depth and balance).
    ///
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(new StringTokenizer(br.readLine()).nextToken());

        var names = new TreeSet<String>();
        var childToParent = new HashMap<String, String>();

        for (int i = 0, len = t - 1; i < len; i++) {
            var tokenizer = new StringTokenizer(br.readLine());
            var child = tokenizer.nextToken();
            var parent = tokenizer.nextToken();
            childToParent.put(child, parent);
            names.add(child);
            names.add(parent);
        }

        for (var name : names) {
            var child = name;
            var parentsCount = 0;
            while (childToParent.containsKey(child)) {
                parentsCount++;
                child = childToParent.get(child);
            }
            System.out.println(name + " " + parentsCount);
        }
    }
}
