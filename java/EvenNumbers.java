package java;

import java.io.PrintWriter;
import java.util.Scanner;

public class EvenNumbers {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        PrintWriter out = new PrintWriter(System.out);

        int a = in.nextInt();
        int b = in.nextInt();

        if (a % 2 != 0)
            a++;

        while (a <= b) {
            out.print(a + " ");
            a += 2;
        }

        in.close();
        out.flush();
        out.close();
    }
}
