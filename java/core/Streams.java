package core;

import java.util.List;
import java.util.stream.IntStream;

public class Streams {
    record MyObject(int id, Long lid, Double did) {}

    public static void main(String[] args) {
        var w = System.out;
        List<Integer> list = IntStream.range(0, 100_000_000).boxed().toList();

        MeasurePerformance.measure(() -> {
            System.out.printf("filter -> map: size %d %n", list.size());
            List<MyObject> list2 = list.stream().filter(i -> i % 2 == 0).map(id -> new MyObject(id, Long.valueOf(id), Double.valueOf(id))).toList();
        });

        MeasurePerformance.measure(() -> {
            System.out.printf("map -> filter: size %d %n", list.size());
            List<MyObject> list2 = list.stream().map(id -> new MyObject(id, Long.valueOf(id), Double.valueOf(id))).filter(o -> o.id % 2 == 0).toList();
        });
    }
}
