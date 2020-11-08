import java.io.*;

public class OldWall {
    static StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));
    static PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));

    static int nextInt() throws IOException {
        in.nextToken();
        return (int) in.nval;
    }

    static class Missed {
        int start = 0;
        int end = 0;
        int count = 0;

        void clear() {
            start = end = count = 0;
        }

        void fill(Missed missed) {
            start = missed.start;
            end = missed.end;
            count = missed.count;
        }

        @Override
        public String toString() {
            return String.format("%d %d %d", start, end, count);
        }
    }

    public static void main(String[] args) throws IOException {
        int N = nextInt();
        int current = 0;
        Missed maxMissed = new Missed();
        Missed missed = new Missed();

        for (int i = 1; i <= N; i++) {
            current = nextInt();
            if (current < 5) {
                if (missed.start == 0)
                    missed.start = i;
                missed.count += 5 - current;
            } else {
                if (missed.start != 0)
                    missed.end = i - 1;

                if (maxMissed.count < missed.count) {
                    maxMissed.fill(missed);
                }

                missed.clear();
            }
        }

        if (maxMissed.count < missed.count) {
            missed.end = N;
            maxMissed.fill(missed);
        }

        out.println(maxMissed.toString());
        out.flush();
    }
}