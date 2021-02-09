import java.io.*;
import java.util.*;

public class Divisibility {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        PrintWriter out = new PrintWriter(System.out);

        int n = in.nextInt();
        int m = in.nextInt();
        // 8 / 2 = 4; 4 * 2 = 8; 8 % 2 + 1 = 1
        // 2 / 8 = 0; 0 * 8 = 0; 0 % 8 + 1 = 1
        out.println(((n / m) * m) % m + 1);

        in.close();
        out.flush();
        out.close();
    }
}