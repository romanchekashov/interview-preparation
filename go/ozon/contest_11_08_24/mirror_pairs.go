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
		var n int
		fmt.Fscan(in, &n)

		a := make([]int, n)
		for j := 0; j < n; j++ {
			fmt.Fscan(in, &a[j])
		}

		fmt.Fprintf(out, "%d\n", solve(a))
	}
}

func solve(a []int) int {
	pairs := 0

	for i := 1; i < len(a)-1; i++ {
		for j := i + 1; j < len(a)-1; j++ {
			if a[i]+a[j] == a[i-1]+a[j+1] {
				pairs++
			}
		}
	}

	return pairs
}
