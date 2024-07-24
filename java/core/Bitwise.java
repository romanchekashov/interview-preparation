package core;

import java.util.HashSet;
import java.util.List;

/**
 * @see <a href="https://www.educative.io/blog/bit-manipulation-in-java">A quick guide to bitwise operators in Java</a>
 */
public class Bitwise {

    private static int leftShift(int number, int i) {
        return number << i;// multiplies `number` with 2^i times.
    }

    private static int arithmeticOrSignedRightShift(int number, int i) {
        return number >> i;// divide `number` with 2^i times.
    }

    private static int logicalOrUnsignedRightShift(int number, int i) {
        return number >>> i;// divide `number` with 2^i times.
    }

    private static boolean isEven(int number) {
        return (number & 1) == 0;
    }

    private static char changeCharCase(char number) {
        return number ^= 32; // Bitwise XOR with 32
    }

    public static void main(String[] args) {
        var w = System.out;
        int x = 12;
        int y = 10;

        w.printf("Bitwise AND[ & ] of (%d[%s], %d[%s]) is: %d[%s]%n", x, Integer.toBinaryString(x), y, Integer.toBinaryString(y), (x & y), Integer.toBinaryString(x & y)); // yields to 8
        w.printf("Bitwise OR[ | ] of (%d[%s], %d[%s]) is: %d[%s]%n", x, Integer.toBinaryString(x), y, Integer.toBinaryString(y), (x | y), Integer.toBinaryString(x | y)); // yields to 14
        w.printf("Bitwise NOT[ ~ ] of %d[%s] is %d[%s]%n", y, Integer.toBinaryString(y), ~y, Integer.toBinaryString(~y)); // yields to -11
        w.printf("Bitwise XOR[ ^ ] of (%d[%s], %d[%s]) is: %d[%s]%n", x, Integer.toBinaryString(x), y, Integer.toBinaryString(y), (x ^ y), Integer.toBinaryString(x ^ y)); // yields to 6
        w.println();

        int number = 8;
        w.println("multiplies `number` with 2^i times");
        w.printf("%d[%s] shifted 1 position left, yields to %d[%s]%n", number, Integer.toBinaryString(number), leftShift(number, 1), Integer.toBinaryString(leftShift(number, 1))); // 12
        w.printf("%d[%s] shifted 2 position left, yields to %d[%s]%n", number, Integer.toBinaryString(number), leftShift(number, 2), Integer.toBinaryString(leftShift(number, 2))); // 24
        w.println("divide `number` with 2^i times");
        w.printf("%d[%s] shifted 1 position arithmeticOrSignedRightShift, yields to %d[%s]%n", number, Integer.toBinaryString(number), arithmeticOrSignedRightShift(number, 1), Integer.toBinaryString(arithmeticOrSignedRightShift(number, 1))); // 16
        w.printf("%d[%s] shifted 2 position arithmeticOrSignedRightShift, yields to %d[%s]%n", number, Integer.toBinaryString(number), arithmeticOrSignedRightShift(number, 2), Integer.toBinaryString(arithmeticOrSignedRightShift(number, 2))); // 32

        w.printf("%d[%s] shifted 1 position logicalOrUnsignedRightShift, yields to %d[%s]%n", number, Integer.toBinaryString(number), logicalOrUnsignedRightShift(number, 1), Integer.toBinaryString(logicalOrUnsignedRightShift(number, 1))); // 4
        w.printf("%d[%s] shifted 2 position logicalOrUnsignedRightShift, yields to %d[%s]%n", number, Integer.toBinaryString(number), logicalOrUnsignedRightShift(number, 2), Integer.toBinaryString(logicalOrUnsignedRightShift(number, 2))); // 2
        w.println();

        List.of(6, 7).forEach(num -> w.printf("%d[%s] is even: %b%n", num, Integer.toBinaryString(num), isEven(num)));
        w.println();

        char ch = 'a';
        w.printf("%s[%s] changeCharCase: %s[%s]%n", ch, Integer.toBinaryString(ch), changeCharCase(ch), Integer.toBinaryString(changeCharCase(ch)));
        ch = changeCharCase(ch);
        w.printf("%s[%s] changeCharCase: %s[%s]%n", ch, Integer.toBinaryString(ch), changeCharCase(ch), Integer.toBinaryString(changeCharCase(ch)));

        String binStr = "101";
        w.printf("%s[%s]%n", binStr, Integer.parseInt(binStr, 2));
        w.printf("%s[%s]%n", binStr, Long.parseLong(binStr, 2));
    }
}
