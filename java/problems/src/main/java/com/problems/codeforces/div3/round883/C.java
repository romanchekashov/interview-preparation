package com.problems.codeforces.div3.round883;

import java.io.IOException;
import java.util.*;

import static com.problems.codeforces.Template.ConsoleScanner;

/**
 * C. Rudolf and the Another Competition
 * https://codeforces.com/contest/1846/problem/C
 *
 */
public class C {

    static class Result {
        int points;
        long penalty;

        Result(int points, long penalty) {
            this.points = points;
            this.penalty = penalty;
        }
    }

    static Result calcPointsAndPenalty(int timeLimit, int[] times) {
        Arrays.sort(times);

        int points = 0;
        long penalty = 0, timeSpent = 0;

        for (int time : times) {
            timeSpent += time;
            if (timeSpent <= timeLimit) {
                points++;
                penalty += timeSpent;
            }
        }
        return new Result(points, penalty);
    }
    static int solution(int n, int m, int h, int[][] t) {
        Map<Integer, List<Result>> resultMap = new TreeMap<>(Comparator.reverseOrder());

        Result rudolfResult = calcPointsAndPenalty(h, t[0]);
        resultMap.put(rudolfResult.points, new ArrayList<>());
        resultMap.get(rudolfResult.points).add(rudolfResult);

        for (int i = 1; i < n; i++) {
            Result result = calcPointsAndPenalty(h, t[i]);
            if (!resultMap.containsKey(result.points)) resultMap.put(result.points, new ArrayList<>());
            resultMap.get(result.points).add(result);
        }

        int place = 0;
        for (Map.Entry<Integer, List<Result>> entry : resultMap.entrySet()) {
            List<Result> results = entry.getValue();
//            System.out.println(entry.getKey() + ":" + results.stream().map(x -> String.format("points = %d, penalty = %d", x[0], x[1])).collect(Collectors.joining(", ")));

            if (rudolfResult.points == entry.getKey()) {
                int samePointsRudolfPlaceByPenalty = results.size();
                for (int i = 1; i < results.size(); i++) {
                    if (results.get(i).penalty >= rudolfResult.penalty) {
                        samePointsRudolfPlaceByPenalty--;
                    }
                }
                place += samePointsRudolfPlaceByPenalty;
//                Collections.sort(results, Comparator.comparing(x -> x, Comparator.comparing(a -> a[1])));
//                System.out.println(results.stream().map(x -> String.format("points = %d, penalty = %d", x[0], x[1])).collect(Collectors.joining(", ")));
                break;
            }
            place += results.size();
        }
//        System.out.println();
//        System.out.println(String.format("Rudolf: points = %d, penalty = %d", rudolfResult[0], rudolfResult[1]));

        return place;
    }

    public static void main(String[] args) throws IOException {
        try (var console = new ConsoleScanner()) {
            var r = console.reader;
            var w = console.writer;
            int t = r.nextInt();

            while (t-- > 0) {
                int n_participants = r.nextInt();
                int m_problems = r.nextInt();
                int h_contest_time = r.nextInt();

                int[][] t_user_time_per_problem = new int[n_participants][m_problems];

                for (int i = 0; i < n_participants; i++) {
                    // i = 0 - Rudolf's index
                    t_user_time_per_problem[i] = new int[m_problems];
                    for (int j = 0; j < m_problems; j++) {
                        t_user_time_per_problem[i][j] = r.nextInt();
                    }
                }

//            n_participants = 2;
//            m_problems = 100000;
//            h_contest_time = 1000000;
////            t_user_time_per_problem = new int[2][];
//            t_user_time_per_problem[0] = new int[m_problems];
//            Arrays.fill(t_user_time_per_problem[0], 1);
//            t_user_time_per_problem[1] = new int[m_problems];
//            Arrays.fill(t_user_time_per_problem[1], 1);

                w.println(solution(n_participants, m_problems, h_contest_time, t_user_time_per_problem));
            }
        }
    }
}
