package codeforces;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class CFcode {

    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer token = new StringTokenizer(br.readLine());

        long count = 0;
        for (int i = 0; i < 100000; ++i) {
            String temp[] = br.readLine().split(" ");
            int u = Integer.parseInt(temp[0]);
            int v = Integer.parseInt(temp[1]);

//            token = new StringTokenizer(br.readLine());
//            int v = Integer.parseInt(token.nextToken());
//            int u = Integer.parseInt(token.nextToken());
            count += (u + v);
        }

        System.out.println(count);
    }
}
