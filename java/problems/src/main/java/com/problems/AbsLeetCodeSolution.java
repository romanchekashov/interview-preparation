package com.problems;

import java.util.List;
import java.util.Objects;

public abstract class AbsLeetCodeSolution implements Tests {

    public void executeTests() {
        MeasurePerformance.measure(this);
    }

    public void doAssert(boolean check) {
        if (!check)
            throw new IllegalArgumentException("Fail!");
    }

    public <T> void doAssert(List<T> actual, List<T> expected) {
        boolean check = actual.size() == expected.size();
        for (int i = 0; i < actual.size(); i++) {
            check = check && Objects.equals(actual.get(i), expected.get(i));
        }

        if (!check)
            throw new IllegalArgumentException(String.format("Fail! Expected: %s, but got: %s", expected, actual));
    }

    public <T> void doAssert(T actual, T expected) {
        if (!Objects.equals(actual, expected))
            throw new IllegalArgumentException(String.format("Fail! Expected: %s, but got: %s", expected, actual));
    }
}
