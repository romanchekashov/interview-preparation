package com.problems.codeforces.div3.round883;

import com.problems.codeforces.Template.ConsoleScanner;

import java.io.IOException;

/**
 * B. Rudolph and Tic-Tac-Toe
 * https://codeforces.com/contest/1846/problem/B
 */
public class B {

    // O(1) time - board dimensions fixed to 3
    static String solution(char[][] board) {
        char won = '.';
        boolean firstDiagonal = board[1][1] == board[0][0] && board[1][1] == board[2][2];
        boolean secondDiagonal = board[1][1] == board[0][2] && board[1][1] == board[2][0];

        if (firstDiagonal || secondDiagonal) won = board[1][1];

        if (won == '.') {
            for (int i = 0; i < 3; i++) {
                if (board[i][i] == '.') continue;

                if (board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                    won = board[i][0];
                    break;
                }

                if (board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
                    won = board[0][i];
                    break;
                }
            }
        }
        return won == '.' ? "DRAW" : String.valueOf(won);
    }

    public static void main(String[] args) throws IOException {
        try (var console = new ConsoleScanner()) {
            int t = console.reader.nextInt();

            while (t-- > 0) {
                char[][] board = new char[3][3];

                for (int i = 0; i < 3; i++) {
                    board[i] = console.reader.next().toCharArray();
                }

                console.writer.println(solution(board));
            }
        }
    }
}
