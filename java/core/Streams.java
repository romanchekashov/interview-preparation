package core;

import java.io.PrintStream;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Streams {
    record MyObject(int id, Long lid, Double did) {}

    static PrintStream w = System.out;

    public static void main(String[] args) {
//        filterMapCompare();
        w.println();

        var words = List.of("cat", "in", "act", "tabs", "the", "bats");

        MeasurePerformance.measure(() -> getWordToAnagramsCount(words));
        MeasurePerformance.measure(() -> getWordToAnagramsCountWithStream(words));
        MeasurePerformance.measure(() -> getWordToAnagramsCountWithStream2(words));

        MeasurePerformance.measure(() -> getWordToAnagramsCount(words));
        MeasurePerformance.measure(() -> getWordToAnagramsCountWithStream(words));
        MeasurePerformance.measure(() -> getWordToAnagramsCountWithStream2(words));

        MeasurePerformance.measure(() -> getWordToAnagramsCount(words));
        MeasurePerformance.measure(() -> getWordToAnagramsCountWithStream(words));
        MeasurePerformance.measure(() -> getWordToAnagramsCountWithStream2(words));
    }

    private static Map<String, Integer> getWordToAnagramsCount(List<String> words) {
        w.println("getWordToAnagramsCount");
        Map<String, Integer> wordToAnagramsCount = new HashMap<>();

        Map<Integer, Set<String>> wordLengthToWord = new HashMap<>();
        for (var word: words) {
            int wLen = word.length();
            if (!wordLengthToWord.containsKey(wLen)) wordLengthToWord.put(wLen, new HashSet<>());
            wordLengthToWord.get(wLen).add(word);
        }
        wordLengthToWord.forEach((key, value) -> w.println(key + ": " + value));
        w.println();

        Map<String, Set<String>> anagrams = new HashMap<>();
        for (var set: wordLengthToWord.values()) {
            if (set.size() < 2) continue;

            for (var word: set) {
                var key = sortedAlphabetically(word);
                if (!anagrams.containsKey(key)) anagrams.put(key, new HashSet<>());
                anagrams.get(key).add(word);
            }
        }
        anagrams.forEach((key, value) -> w.println(key + ": " + value));
        w.println();

        anagrams.values().stream().filter(set -> set.size() > 1).forEach(set -> {
            for (var word: set) {
                wordToAnagramsCount.put(word, set.size());
            }
        });
        wordToAnagramsCount.forEach((key, value) -> w.println(key + ": " + value));
        w.println();

        return wordToAnagramsCount;
    }

    private static Map<String, Integer> getWordToAnagramsCountWithStream(List<String> words) {
        w.println("getWordToAnagramsCountWithStream");
        Map<String, Integer> wordToAnagramsCount = new HashMap<>();

        Map<Integer, Set<String>> wordLengthToWord = words
                .stream()
                .collect(Collectors.groupingBy(String::length, Collectors.toSet()));
        wordLengthToWord.forEach((key, value) -> w.println(key + ": " + value));
        w.println();

        Map<String, Set<String>> anagrams = wordLengthToWord.values()
                .stream()
                .filter(set -> set.size() > 1)
                .flatMap(Set::stream)
                .collect(Collectors.groupingBy(Streams::sortedAlphabetically, Collectors.toSet()));
        anagrams.forEach((key, value) -> w.println(key + ": " + value));
        w.println();

        anagrams.values().stream().filter(set -> set.size() > 1).forEach(set -> {
            for (var word: set) {
                wordToAnagramsCount.put(word, set.size());
            }
        });
        wordToAnagramsCount.forEach((key, value) -> w.println(key + ": " + value));
        w.println();

        return wordToAnagramsCount;
    }

    private static Map<String, Integer> getWordToAnagramsCountWithStream2(List<String> words) {
        w.println("getWordToAnagramsCountWithStream2");
        Map<String, Integer> wordToAnagramsCount = new HashMap<>();

        words
                .stream()
                .collect(Collectors.groupingBy(String::length, Collectors.toSet()))
                .values()
                .stream()
                .filter(set -> set.size() > 1)
                .flatMap(Set::stream)
                .collect(Collectors.groupingBy(Streams::sortedAlphabetically, Collectors.toSet()))
                .values().stream().filter(set -> set.size() > 1).forEach(set -> {
            for (var word: set) {
                wordToAnagramsCount.put(word, set.size());
            }
        });
        wordToAnagramsCount.forEach((key, value) -> w.println(key + ": " + value));
        w.println();

        return wordToAnagramsCount;
    }

    // O(nlogn)
    private static String sortedAlphabetically(String word) {
        return word.chars().sorted().mapToObj(c -> String.valueOf((char) c)).collect(Collectors.joining());
    }

    private static void filterMapCompare() {
        List<Integer> list = IntStream.range(0, 10_000_000).boxed().toList();

        MeasurePerformance.measure(() -> {
            System.out.printf("filter -> map: size %d %n", list.size());
            List<MyObject> list2 = list.stream().filter(i -> i % 2 == 0).map(id -> new MyObject(id, Long.valueOf(id), Double.valueOf(id))).toList();
        });

        MeasurePerformance.measure(() -> {
            System.out.printf("map -> filter: size %d %n", list.size());
            List<MyObject> list2 = list.stream().map(id -> new MyObject(id, Long.valueOf(id), Double.valueOf(id))).filter(o -> o.id % 2 == 0).toList();
        });
    }
}
