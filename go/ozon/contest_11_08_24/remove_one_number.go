package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var in *bufio.Reader
	var out *bufio.Writer
	in = bufio.NewReader(os.Stdin)
	out = bufio.NewWriter(os.Stdout)
	defer out.Flush()

	var t int
	fmt.Fscan(in, &t)

	for i := 0; i < t; i++ {
		var n string
		fmt.Fscan(in, &n)

		fmt.Fprintf(out, "%s\n", solve(n))
	}
}

func solve(n string) string {
	if len(n) == 1 {
		return "0"
	}

	deleteIdx := len(n) - 1
	for i := 1; i < len(n); i++ {
		prev := int(n[i-1] - '0')
		cur := int(n[i] - '0')
		if prev < cur {
			deleteIdx = i - 1
			break
		}
	}
	return deleteChar(n, deleteIdx)
}

func deleteChar(s string, i int) string {
	return s[:i] + s[i+1:]
}
