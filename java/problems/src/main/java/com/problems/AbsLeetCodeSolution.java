package com.problems;

import java.util.List;

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
            check = check && actual.get(i).equals(expected.get(i));
        }

        if (!check)
            throw new IllegalArgumentException("Fail!");
    }
}
