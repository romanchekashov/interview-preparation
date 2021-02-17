package java;

import java.io.PrintWriter;
import java.util.Scanner;

public class DividingApples {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        PrintWriter out = new PrintWriter(System.out);

        int pupils = in.nextInt();
        int apples = in.nextInt();
        out.println(apples / pupils);

        in.close();
        out.flush();
        out.close();
    }
}
