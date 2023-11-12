package codeforces;

// copy code from here
import java.util.*;
import java.io.*;

public class Template {
    public static class InputReader {
        public BufferedReader reader;
        private StringTokenizer tokenizer;

        public InputReader(InputStreamReader stream) {
            reader = new BufferedReader(stream, 32768);
            tokenizer = null;
        }
        public String next() { // reads in the next string
            while (tokenizer == null || !tokenizer.hasMoreTokens()) {
                try {
                    tokenizer = new StringTokenizer(reader.readLine());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            return tokenizer.nextToken();
        }

        public int nextInt() { // reads in the next int
            return Integer.parseInt(next());
        }

        public long nextLong() { // reads in the next long
            return Long.parseLong(next());
        }

        public double nextDouble() { // reads in the next double
            return Double.parseDouble(next());
        }
    }

    public static class ConsoleScanner implements Closeable {
        public InputReader reader;
        public PrintWriter writer;

        public ConsoleScanner() {
            reader = new InputReader(new InputStreamReader(System.in));
            writer = new PrintWriter(System.out);
        }

        @Override
        public void close() throws IOException {
            reader.reader.close();
            writer.close();
        }
    }

    public static class FileScanner implements Closeable {
        public InputReader reader;
        public PrintWriter writer;

        public FileScanner(String inputFileName, String outputFileName) {
            try {
                reader = new InputReader(new FileReader(inputFileName));
            } catch (FileNotFoundException e) {
                throw new IllegalArgumentException(String.format("Input file %s not found.", inputFileName));
            }

            try {
                writer = new PrintWriter(new BufferedWriter(new FileWriter(outputFileName)));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        @Override
        public void close() throws IOException {
            reader.reader.close();
            writer.close();
        }
    }

    // insert your code here

}
