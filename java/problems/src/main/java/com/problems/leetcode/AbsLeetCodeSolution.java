package com.problems.leetcode;

import core.MeasurePerformance;
import core.Tests;

public abstract class AbsLeetCodeSolution implements Tests {

    public void executeTests() {
        MeasurePerformance.measure(this);
    }

    public void doAssert(boolean check) {
        if (!check)
            throw new IllegalArgumentException("Fail!");
    }
}
