package com.problems;

/// - [Jfokus 2024 - Recordings](https://www.jfokus.se/articles/jfokus-2025-recordings)
/// - [YouTube: How to write fast Java code – thinking about memory by Anders Peterson](https://www.youtube.com/watch?v=SovDuQefCys)
/// - [oj! Algorithms](https://github.com/optimatika/ojAlgo)
///
/// The method `loopICJ` works much faster than `loopJCI` due to better cache locality and memory access patterns. Here's a detailed explanation:
///
/// 1. **Cache Locality**:
///    - Modern CPUs have multiple levels of cache (L1, L2, L3) to speed up memory access.
///    - When data is accessed, it is loaded into the cache in blocks (cache lines).
///    - Accessing data sequentially (in a linear fashion) is faster because it takes advantage of spatial locality, meaning consecutive memory accesses are likely to be in the same cache line.
///
/// 2. **Memory Access Patterns**:
///    - In `loopICJ`, the innermost loop iterates over the `right` matrix's rows (`right[c][j]`), which means it accesses elements in a row-major order (sequentially in memory).
///    - In `loopJCI`, the innermost loop iterates over the `left` matrix's columns (`left[i][c]`), which means it accesses elements in a column-major order (non-sequentially in memory).
///
/// 3. **Impact on Performance**:
///    - `loopICJ` benefits from better cache utilization because it accesses memory in a more cache-friendly manner.
///    - `loopJCI` suffers from poor cache performance because it accesses memory in a way that causes more cache misses (accessing columns instead of rows).
///
/// Here is a brief comparison of the two methods:
///
/// ### `loopICJ`
/// ```java
/// double[][] loopICJ() {
///     for (int i = 0; i < DIM; i++) {
///         for (int c = 0; c < DIM; c++) {
///             for (int j = 0; j < DIM; j+) {
///                 prod[i][j] += left[i][c] * right[c][j];
///    }
///         }
///     }
///     eturn prod;
/// }
/// ```
///
/// ### `loopJCI`
/// ```java
/// double[][] loopJCI() {
///     for (it j = 0; j < DIM; j++) {
///         for (it c = 0; c < DIM; c++) {
///             for (it i = 0; i < DIM; i++) {
///                 prod[i][j] += left[i][c] * right[c][j];
///             }
///        }
///     }
///     return prod;
/// }
/// ```
///
/// In summary, `loopICJ` is faster because it accesses memory in a way that is more efficient for the CPU cache, leading to fewer cache misses and better overall performance.
public class MatrixMultiplication {

    public static void main(String[] args) {

      MeasurePerformance.measure(() -> {
        System.out.println("loopJIC");
        new MatrixMultiplication().loopJIC();
      });

      MeasurePerformance.measure(() -> {
        System.out.println("loopJCI");
        new MatrixMultiplication().loopJCI();
      });

      MeasurePerformance.measure(() -> {
        System.out.println("loopIJC");
        new MatrixMultiplication().loopIJC();
      });

      MeasurePerformance.measure(() -> {
        System.out.println("loopICJ");
        new MatrixMultiplication().loopICJ();
      });

      MeasurePerformance.measure(() -> {
        System.out.println("loopCIJ");
        new MatrixMultiplication().loopCIJ();
      });

      MeasurePerformance.measure(() -> {
        System.out.println("loopCJI");
        new MatrixMultiplication().loopCJI();
      });

      MeasurePerformance.measure(() -> {
        System.out.println("loopICJ_faster");
        new MatrixMultiplication().loopICJ_faster();
      });
    }

    private static final int DIM = 1000;

    double[][] left = new double[DIM][DIM];
    double[][] right = new double[DIM][DIM];
    double[][] prod = new double[DIM][DIM];



  double[][] loopICJ_faster() {
    for (int i = 0; i < DIM; i++) {
      double[] prod_i = prod[i];
      double[] left_i = left[i];

      for (int c = 0; c < DIM; c++) {
        double left_i_c = left_i[c];
        double[] right_c = right[c];

        for (int j = 0; j < DIM; j++) {
          prod_i[j] += left_i_c * right_c[j];
        }
      }
    }
    return prod;
  }

    double[][] loopIJC() {
        for (int i = 0; i < DIM; i++) {
            for (int j = 0; j < DIM; j++) {
                for (int c = 0; c < DIM; c++) {
                    prod[i][j] += left[i][c] * right[c][j];
                }
            }
        }
        return prod;
    }

    double[][] loopICJ() {
        for (int i = 0; i < DIM; i++) {
          for (int c = 0; c < DIM; c++) {
            for (int j = 0; j < DIM; j++) {
                    prod[i][j] += left[i][c] * right[c][j];
                }
            }
        }
        return prod;
    }

  double[][] loopJIC() {
    for (int j = 0; j < DIM; j++) {
      for (int i = 0; i < DIM; i++) {
        for (int c = 0; c < DIM; c++) {
          prod[i][j] += left[i][c] * right[c][j];
        }
      }
    }
    return prod;
  }

  double[][] loopJCI() {
    for (int j = 0; j < DIM; j++) {
      for (int c = 0; c < DIM; c++) {
        for (int i = 0; i < DIM; i++) {
          prod[i][j] += left[i][c] * right[c][j];
        }
      }
    }
    return prod;
  }

  double[][] loopCIJ() {
    for (int c = 0; c < DIM; c++) {
      for (int i = 0; i < DIM; i++) {
        for (int j = 0; j < DIM; j++) {
          prod[i][j] += left[i][c] * right[c][j];
        }
      }
    }
    return prod;
  }

  double[][] loopCJI() {
    for (int c = 0; c < DIM; c++) {
      for (int j = 0; j < DIM; j++) {
        for (int i = 0; i < DIM; i++) {
          prod[i][j] += left[i][c] * right[c][j];
        }
      }
    }
    return prod;
  }
}
